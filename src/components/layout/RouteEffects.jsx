import { useEffect, useEffectEvent, useLayoutEffect, useRef } from 'react'
import { useLenis } from 'lenis/react'
import { useLocation, useNavigationType } from 'react-router-dom'
import { getRoute, pageTitle } from '../../routes'
import { siteOrigin } from '../../data/site'
import { useMotion } from '../../hooks/useMotion'

function RouteMeta() {
  const { pathname } = useLocation()
  const route = getRoute(pathname)
  useEffect(() => {
    document.title = pageTitle(route)
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', route.description)
    let canonical = document.querySelector('link[rel="canonical"]')
    let robots = document.querySelector('meta[name="robots"]')

    if (route.noindex) {
      canonical?.remove()
      if (!robots) {
        robots = document.createElement('meta')
        robots.name = 'robots'
        document.head.append(robots)
      }
      robots.content = 'noindex'
    } else {
      robots?.remove()
      if (!canonical) {
        canonical = document.createElement('link')
        canonical.rel = 'canonical'
        document.head.append(canonical)
      }
      canonical.href = `${siteOrigin}${route.path}`
    }
  }, [route])
  return null
}

function RoutePosition() {
  const location = useLocation()
  const type = useNavigationType()
  const positions = useRef(new Map())
  const previousLocation = useRef(null)
  const lenis = useLenis()
  const { paused } = useMotion()
  const move = useEffectEvent((target, immediate) => {
    if (lenis) {
      // Cancel the previous route's inertia, even if the new target is equal
      // to the current position after the browser clamps a shorter page.
      lenis.stop()
      lenis.start()
      // The route can change height before ResizeObserver has run.
      lenis.resize()
      lenis.scrollTo(target, { immediate: immediate || paused, force: true })
    } else if (target instanceof HTMLElement) {
      target.scrollIntoView({
        behavior: immediate || paused ? 'instant' : 'smooth',
      })
    } else window.scrollTo({ top: target, behavior: 'instant' })
  })
  useLayoutEffect(() => {
    const previous = window.history.scrollRestoration
    window.history.scrollRestoration = 'manual'
    return () => {
      window.history.scrollRestoration = previous
    }
  }, [])
  useLayoutEffect(() => {
    const key = location.key
    const stored = positions.current
    const changedPage = previousLocation.current?.pathname !== location.pathname
    const target =
      location.hash && document.getElementById(location.hash.slice(1))
    if (type === 'POP' && stored.has(key)) move(stored.get(key), true)
    else if (target)
      move(target, changedPage || Boolean(location.state?.instantScroll))
    else move(0, true)
    if (target) target.focus({ preventScroll: true })
    else if (previousLocation.current)
      document.querySelector('main')?.focus({ preventScroll: true })
    previousLocation.current = location
    // Remember the reading position before a shorter route can clamp the page.
    let lastScroll = window.scrollY
    const remember = () => {
      lastScroll = window.scrollY
    }
    window.addEventListener('scroll', remember, { passive: true })
    return () => {
      window.removeEventListener('scroll', remember)
      stored.set(key, lastScroll)
    }
  }, [location, type])
  return null
}

export function RouteEffects() {
  return (
    <>
      <RouteMeta />
      <RoutePosition />
    </>
  )
}
