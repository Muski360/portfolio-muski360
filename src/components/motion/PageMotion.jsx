import { useEffect, useRef } from 'react'
import { useMotion } from '../../hooks/useMotion'

// Enhancements start from visible HTML. No observer, no animation, or a
// cancelled entrance always leaves the authored resting composition intact.
export function PageMotion({ children }) {
  const rootRef = useRef(null)
  const seen = useRef(new WeakSet())
  const { paused } = useMotion()

  useEffect(() => {
    const root = rootRef.current
    if (paused || !root.animate || typeof IntersectionObserver === 'undefined')
      return

    const compact = window.matchMedia('(max-width: 650px)').matches
    const animations = new Map()
    const ease = getComputedStyle(root).getPropertyValue('--ease-out').trim() || 'ease-out'
    const stop = () => {
      animations.forEach((animation) => animation.cancel())
      animations.clear()
    }
    const observer = new IntersectionObserver(
      (entries) => {
        let order = 0
        for (const { target, isIntersecting } of entries) {
          if (!isIntersecting || seen.current.has(target)) continue
          seen.current.add(target)
          observer.unobserve(target)
          // History, deep links and keyboard focus must never wait for a reveal.
          if (
            document.hidden || target.contains(document.activeElement) ||
            (window.scrollY > 0 && target.getBoundingClientRect().top < 24)
          ) continue
          const rule = target.dataset.reveal === 'rule'
          const name = target.dataset.reveal === 'name'
          const title = name || target.dataset.reveal === 'title'
          const frames = rule
            ? [{ scale: '0 1' }, { scale: '1 1' }]
            : name
              ? [
                  { clipPath: 'inset(0 -5% 100% -5%)', translate: '0 0.18em' },
                  { clipPath: 'inset(-15% -5% -15% -5%)', translate: '0 0' },
                ]
              : [
                  { opacity: title ? 0.45 : 0.65, translate: `0 ${compact ? 12 : 24}px` },
                  { opacity: 1, translate: '0 0' },
                ]
          const animation = target.animate(frames, {
            duration: compact ? 420 : title ? 680 : 520,
            delay: Math.min(order++ * 55, 165),
            easing: ease,
            fill: 'backwards',
          })
          animations.set(target, animation)
          animation.onfinish = () => animations.delete(target)
        }
      },
      { rootMargin: '0px 0px -24px 0px', threshold: 0.08 },
    )
    root.querySelectorAll('[data-reveal]').forEach((element) => observer.observe(element))
    const onVisibility = () => {
      if (document.hidden) stop()
    }
    root.addEventListener('focusin', stop)
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      observer.disconnect()
      stop()
      root.removeEventListener('focusin', stop)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [paused])

  useEffect(() => {
    const scene = rootRef.current.querySelector('[data-depth]')
    if (paused || !scene) return
    const pointer = window.matchMedia('(hover: hover) and (pointer: fine)')
    let frame = 0
    const reset = () => {
      cancelAnimationFrame(frame)
      frame = 0
      scene.style.removeProperty('--disk-pitch')
      scene.style.removeProperty('--disk-yaw')
    }
    const move = (event) => {
      if (
        !pointer.matches || event.pointerType === 'touch' ||
        event.buttons || scene.matches(':focus-within')
      ) return
      const { clientX, clientY } = event
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const box = scene.getBoundingClientRect()
        const x = Math.max(-0.5, Math.min(0.5, (clientX - box.left) / box.width - 0.5))
        const y = Math.max(-0.5, Math.min(0.5, (clientY - box.top) / box.height - 0.5))
        scene.style.setProperty('--disk-pitch', `${-y * 6}deg`)
        scene.style.setProperty('--disk-yaw', `${x * 10}deg`)
        frame = 0
      })
    }
    scene.addEventListener('pointermove', move)
    scene.addEventListener('pointerleave', reset)
    scene.addEventListener('pointerdown', reset)
    scene.addEventListener('focusin', reset)
    pointer.addEventListener('change', reset)
    window.addEventListener('blur', reset)
    document.addEventListener('visibilitychange', reset)
    return () => {
      reset()
      scene.removeEventListener('pointermove', move)
      scene.removeEventListener('pointerleave', reset)
      scene.removeEventListener('pointerdown', reset)
      scene.removeEventListener('focusin', reset)
      pointer.removeEventListener('change', reset)
      window.removeEventListener('blur', reset)
      document.removeEventListener('visibilitychange', reset)
    }
  }, [paused])

  return (
    <div className="route-content" ref={rootRef}>
      {children}
    </div>
  )
}
