import { useEffect } from 'react'
import { ReactLenis, useLenis } from 'lenis/react'
import { useMotion } from '../../hooks/useMotion'

const options = {
  autoRaf: true,
  lerp: 0.12,
  smoothWheel: true,
  syncTouch: false,
  // React Router owns anchors, focus and history in RouteEffects.
  anchors: false,
  stopInertiaOnNavigate: true,
}

const scrollKeys = new Set([
  'Tab',
  'Home',
  'End',
  'PageUp',
  'PageDown',
  'ArrowUp',
  'ArrowDown',
  ' ',
])

export function SmoothScroll() {
  const { paused } = useMotion()
  const lenis = useLenis()
  useEffect(() => {
    if (!lenis || paused) return
    const interrupt = () => {
      if (lenis.isScrolling !== 'smooth') return
      lenis.stop()
      lenis.start()
    }
    const onKeyDown = (event) => {
      if (
        event.defaultPrevented ||
        event.ctrlKey ||
        event.metaKey ||
        event.altKey ||
        !scrollKeys.has(event.key)
      )
        return
      if (
        event.key !== 'Tab' &&
        event.target.closest('input, textarea, select, [contenteditable]')
      )
        return
      interrupt()
    }
    // Hand control back before native keyboard navigation, text selection,
    // scrollbar dragging or touch begins; never prevent those input events.
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('pointerdown', interrupt)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('pointerdown', interrupt)
    }
  }, [lenis, paused])
  // Unmount only the enhancement: pause restores native input without
  // remounting the pages or leaving a stopped scroll container behind.
  return paused ? null : <ReactLenis root options={options} />
}
