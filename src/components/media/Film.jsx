import { useId, useRef } from 'react'
import { useVideoPlayback } from '../../hooks/useVideoPlayback'

const rotationText = (angle) => `${Math.round((angle / 360) * 100)}% da rotação`

function FilmContent({ name, src, poster, alt, isDisk, className, priority }) {
  const {
    videoRef,
    frameRef,
    paused,
    ready,
    failed,
    playing,
    resume,
    pause,
    seek,
    events,
  } = useVideoPlayback(src)
  const rangeRef = useRef(null)
  const controlId = useId()
  const hasVideo = Boolean(src) && !failed

  const updateRotation = (event) => {
    const video = event.currentTarget
    const range = rangeRef.current
    if (
      !range ||
      video.paused ||
      document.activeElement === range ||
      !Number.isFinite(video.duration)
    )
      return
    const angle = Math.round((video.currentTime / video.duration) * 360)
    // Playback progress belongs to the native control, not React render state.
    range.value = angle
    range.setAttribute('aria-valuetext', rotationText(angle))
  }

  return (
    <div className={isDisk ? 'disk-film-wrap' : ''}>
      <div className={`film ${className}`} ref={frameRef}>
        <img
          src={poster}
          alt={alt}
          width={isDisk ? 720 : 1280}
          height="720"
          fetchPriority={priority ? 'high' : 'auto'}
          loading={priority ? 'eager' : 'lazy'}
        />
        {hasVideo && (
          <video
            ref={videoRef}
            className={ready ? 'is-ready' : ''}
            poster={poster}
            muted
            loop
            playsInline
            preload="none"
            aria-hidden="true"
            {...events}
            onTimeUpdate={isDisk ? updateRotation : undefined}
          />
        )}
        {!isDisk && hasVideo && (
          <button
            className="film-pause"
            type="button"
            disabled={paused}
            onClick={playing ? pause : resume}
            aria-label={
              paused
                ? `Reproduzir prévia de ${name} — movimento pausado`
                : `${playing ? 'Pausar' : 'Reproduzir'} prévia de ${name}`
            }
          >
            {playing && !paused ? 'Ⅱ' : '▶'}
            <span>{playing && !paused ? 'PAUSAR' : 'REPRODUZIR'}</span>
          </button>
        )}
      </div>
      {isDisk && hasVideo && (
        <div className="disk-controls">
          <label className="sr-only" htmlFor={controlId}>
            Rotação do disquete
          </label>
          <span className="rotation-symbol" aria-hidden="true">
            ↔
          </span>
          <input
            id={controlId}
            ref={rangeRef}
            type="range"
            min="0"
            max="360"
            step="1"
            defaultValue="0"
            aria-valuetext={rotationText(0)}
            onChange={(event) => {
              const angle = Number(event.target.value)
              event.target.setAttribute('aria-valuetext', rotationText(angle))
              seek(angle / 360)
            }}
          />
          <button
            type="button"
            className="disk-reset"
            disabled={playing || paused}
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

// The poster stays in the DOM when decoding, autoplay, or enhancement fails.
export function Film({
  name,
  variant = 'preview',
  src,
  poster: suppliedPoster,
  alt,
  className = '',
  priority = false,
}) {
  const isDisk = variant === 'disk'
  const poster = isDisk ? '/media/muski-disk.webp' : suppliedPoster
  const videoSource = isDisk ? '/media/muski-disk.mp4' : src

  return (
    <FilmContent
      key={videoSource || poster}
      name={name}
      src={videoSource}
      poster={poster}
      alt={
        isDisk
          ? 'Disquete preto com etiqueta MUSKI360, Fullstack, Build 001'
          : alt
      }
      isDisk={isDisk}
      className={className}
      priority={priority}
    />
  )
}
