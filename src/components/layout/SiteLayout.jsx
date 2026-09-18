import { useSyncExternalStore } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { SiteHeader } from './SiteHeader'
import { SiteFooter } from './SiteFooter'
import { RouteEffects } from './RouteEffects'
import { MotionProvider } from '../motion/MotionProvider'
import { SmoothScroll } from '../motion/SmoothScroll'

const subscribeReady = () => () => {}
const clientReady = () => true
const serverReady = () => false

export function SiteLayout() {
  const ready = useSyncExternalStore(subscribeReady, clientReady, serverReady)
  const location = useLocation()

  return (
    <MotionProvider>
      <SmoothScroll />
      <div className="site-shell" data-ready={ready}>
        <Link
          className="skip-link"
          to="#conteudo"
          state={{ instantScroll: true }}
        >
          Pular para o conteúdo
        </Link>
        <SiteHeader />
        <RouteEffects />
        <div className="route-content" key={location.pathname}>
          <Outlet />
        </div>
        <SiteFooter />
      </div>
    </MotionProvider>
  )
}
