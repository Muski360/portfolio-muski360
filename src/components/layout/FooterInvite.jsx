import { Fragment, useEffect, useRef } from 'react'
import { useMotion } from '../../hooks/useMotion'

export function FooterInvite({ href }) {
  const linkRef = useRef(null)
  const { paused } = useMotion()

  useEffect(() => {
    const link = linkRef.current
    if (paused || !link?.animate) return
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
    const observer =
      typeof IntersectionObserver === 'undefined'
        ? null
        : new IntersectionObserver(
            ([entry]) => {
              if (entry.intersectionRatio >= 0.45) roll()
              else if (!entry.isIntersecting) stop()
            },
            { threshold: [0, 0.45] },
          )
    observer?.observe(link)
    link.addEventListener('pointerenter', roll)
    link.addEventListener('focus', roll)
    const onVisibility = () => {
      if (document.hidden) stop()
    }
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      stop()
      observer?.disconnect()
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
