import {
  Fragment,
  createContext,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
} from 'react'

const MotionContext = createContext({ paused: false })
const motionQuery = () => window.matchMedia('(prefers-reduced-motion: reduce)')
const subscribeMotion = (callback) => {
  const query = motionQuery()
  query.addEventListener('change', callback)
  return () => query.removeEventListener('change', callback)
}
const getMotion = () => motionQuery().matches

export function MotionProvider({ children }) {
  const reduced = useSyncExternalStore(subscribeMotion, getMotion, () => false)
  const [userPaused, setUserPaused] = useState(false)
  const paused = reduced || userPaused
  return (
    <MotionContext.Provider
      value={{
        paused,
        reduced,
        toggle: () => setUserPaused((value) => !value),
      }}
    >
      <div data-motion={paused ? 'paused' : 'playing'}>{children}</div>
    </MotionContext.Provider>
  )
}

export function MotionControl() {
  const { paused, reduced, toggle } = useContext(MotionContext)
  return (
    <button
      className="motion-control"
      type="button"
      onClick={toggle}
      disabled={reduced}
      aria-label={
        reduced
          ? 'Movimento reduzido pelo sistema'
          : paused
            ? 'Ativar movimento'
            : 'Pausar movimento'
      }
      aria-pressed={paused}
      title={
        reduced
          ? 'Movimento reduzido pelo sistema'
          : paused
            ? 'Ativar movimento'
            : 'Pausar movimento'
      }
    >
      <svg viewBox="0 0 20 20" aria-hidden="true">
        {paused ? (
          <path d="m7 4 9 6-9 6Z" />
        ) : (
          <>
            <path d="M6 4v12M13 4v12" />
          </>
        )}
      </svg>
    </button>
  )
}

// Keep a real poster in the DOM. A blocked decoder, failed download, or denied
// autoplay must never turn the media composition into an empty rectangle.
export function Film({
  name,
  src,
  poster: suppliedPoster,
  alt,
  className = '',
  priority = false,
}) {
  const { paused } = useContext(MotionContext)
  const videoRef = useRef(null)
  const frameRef = useRef(null)
  const [ready, setReady] = useState(false)
  const [failed, setFailed] = useState(false)
  const [angle, setAngle] = useState(0)
  const [manual, setManual] = useState(false)
  const [blocked, setBlocked] = useState(false)
  const pendingSeek = useRef(null)
  const controlId = useId()
  const isDisk = name === 'disk'
  const poster = isDisk ? '/media/muski-disk.webp' : suppliedPoster
  const videoSource = isDisk ? '/media/muski-disk.mp4' : src

  useEffect(() => {
    const video = videoRef.current
    if (!video || failed || typeof IntersectionObserver === 'undefined') return
    let visible = false
    let disposed = false
    const sync = () => {
      if (disposed) return
      if (!visible || paused || manual || document.hidden) {
        video.pause()
        return
      }
      if (!video.getAttribute('src')) {
        video.src = videoSource
      }
      video.play()?.catch(() => {
        if (!disposed) setBlocked(true)
      })
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting
        sync()
      },
      { threshold: 0.08 },
    )
    observer.observe(frameRef.current)
    document.addEventListener('visibilitychange', sync)
    return () => {
      disposed = true
      observer.disconnect()
      document.removeEventListener('visibilitychange', sync)
      video.pause()
    }
  }, [paused, videoSource, failed, manual])

  const resume = () => {
    const video = videoRef.current
    if (!video || paused) return
    if (!video.getAttribute('src')) video.src = videoSource
    setManual(false)
    video.play()?.catch(() => setBlocked(true))
  }

  const rotateDisk = (event) => {
    const nextAngle = Number(event.target.value)
    const video = videoRef.current
    setAngle(nextAngle)
    setManual(true)
    if (!video || failed) return
    video.pause()
    const seek = () => {
      video.currentTime = (nextAngle / 360) * Math.max(0, video.duration - 0.05)
    }
    if (video.readyState >= 1) seek()
    else {
      pendingSeek.current = nextAngle
      if (!video.getAttribute('src')) {
        video.src = '/media/muski-disk.mp4'
        video.load()
      }
    }
  }

  return (
    <div className={isDisk ? 'disk-film-wrap' : ''}>
      <div className={`film ${className}`} ref={frameRef}>
        <img
          src={poster}
          alt={
            isDisk
              ? 'Disquete preto com etiqueta MUSKI360, Fullstack, Build 001'
              : alt
          }
          width={isDisk ? 720 : 1280}
          height={isDisk ? 720 : 720}
          fetchPriority={priority ? 'high' : 'auto'}
          loading={priority ? 'eager' : 'lazy'}
        />
        {!failed && (
          <video
            ref={videoRef}
            className={ready ? 'is-ready' : ''}
            poster={poster}
            muted
            loop
            playsInline
            preload="none"
            aria-hidden="true"
            onPlaying={() => {
              setReady(true)
              setBlocked(false)
            }}
            onSeeked={() => setReady(true)}
            onLoadedMetadata={(event) => {
              if (pendingSeek.current === null) return
              event.currentTarget.currentTime =
                (pendingSeek.current / 360) *
                Math.max(0, event.currentTarget.duration - 0.05)
              pendingSeek.current = null
            }}
            onError={() => setFailed(true)}
            onTimeUpdate={(event) => {
              if (
                isDisk &&
                !manual &&
                Number.isFinite(event.currentTarget.duration)
              )
                setAngle(
                  Math.round(
                    (event.currentTarget.currentTime /
                      event.currentTarget.duration) *
                      360,
                  ),
                )
            }}
          />
        )}
        {!isDisk && !failed && (
          <button
            className="film-pause"
            type="button"
            disabled={paused}
            onClick={() => {
              if (manual || blocked) resume()
              else setManual(true)
            }}
            aria-label={
              paused
                ? 'Prévia pausada pelo controle de movimento'
                : manual || blocked
                  ? `Reproduzir prévia de ${name}`
                  : `Pausar prévia de ${name}`
            }
          >
            {paused || manual || blocked ? '▶' : 'Ⅱ'}
            <span>{paused || manual || blocked ? 'REPRODUZIR' : 'PAUSAR'}</span>
          </button>
        )}
      </div>
      {isDisk && !failed && (
        <div className="disk-controls">
          <label className="sr-only" htmlFor={controlId}>
            Rotação do disquete
          </label>
          <span className="rotation-symbol" aria-hidden="true">
            ↔
          </span>
          <input
            id={controlId}
            type="range"
            min="0"
            max="360"
            step="1"
            value={angle}
            onChange={rotateDisk}
            aria-valuetext={`${Math.round((angle / 360) * 100)}% da rotação`}
          />
          <button
            type="button"
            className="disk-reset"
            disabled={(!manual && !blocked) || paused}
            onClick={resume}
            aria-label="Retomar rotação automática"
            title="Retomar rotação automática"
          >
            ↻
          </button>
        </div>
      )}
    </div>
  )
}

export function FooterInvite({ href }) {
  const linkRef = useRef(null)
  const { paused } = useContext(MotionContext)

  useEffect(() => {
    const link = linkRef.current
    if (paused || !link?.animate || typeof IntersectionObserver === 'undefined')
      return
    let animations = []
    let lastRun = -Infinity
    const stop = () => {
      animations.forEach((animation) => animation.cancel())
      animations = []
    }
    const roll = () => {
      if (document.hidden || performance.now() - lastRun < 1100) return
      lastRun = performance.now()
      stop()
      animations = [...link.querySelectorAll('.type-track')].map(
        (letter, index) =>
          letter.animate(
            [{ transform: 'translateY(0)' }, { transform: 'translateY(-50%)' }],
            {
              duration: 740,
              delay: (index % 14) * 22,
              easing: 'cubic-bezier(.65,0,.25,1)',
            },
          ),
      )
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) roll()
        else stop()
      },
      { threshold: 0.45 },
    )
    observer.observe(link)
    link.addEventListener('pointerenter', roll)
    link.addEventListener('focus', roll)
    const onVisibility = () => {
      if (document.hidden) stop()
    }
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      stop()
      observer.disconnect()
      link.removeEventListener('pointerenter', roll)
      link.removeEventListener('focus', roll)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [paused])

  return (
    <a
      className="footer-invite"
      href={href}
      ref={linkRef}
      aria-label="Vamos criar algo juntos? Enviar e-mail"
    >
      {['VAMOS CRIAR', 'ALGO JUNTOS?'].map((line, row) => (
        <Fragment key={line}>
          <span className="footer-line" aria-hidden="true">
            <span className="footer-type-word">
              {line.split(' ').map((word, wordIndex) => (
                <Fragment key={word}>
                  {wordIndex > 0 && ' '}
                  <span className="footer-word">
                    {[...word].map((letter, index) => (
                      <span className="footer-letter" key={index}>
                        <span className="type-track" data-letter={letter}>
                          <span>{letter}</span>
                        </span>
                      </span>
                    ))}
                  </span>
                </Fragment>
              ))}
            </span>
            {row === 1 && (
              <svg className="arrow diagonal" viewBox="0 0 24 24">
                <path d="M4 12h16M12 4l8 8-8 8" />
              </svg>
            )}
          </span>
          {row === 0 && ' '}
        </Fragment>
      ))}
    </a>
  )
}

export function Portrait({ className = '', priority = false }) {
  return (
    <img
      className={`portrait ${className}`}
      src="/media/murilo-960.webp"
      srcSet="/media/murilo-480.webp 480w, /media/murilo-960.webp 960w"
      sizes="(max-width: 700px) 90vw, 45vw"
      alt="Murilo Bastos"
      width="1122"
      height="1402"
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
    />
  )
}
