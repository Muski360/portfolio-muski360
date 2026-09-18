import { useSyncExternalStore } from 'react'
import { Outlet, useLinkClickHandler, useLocation } from 'react-router-dom'
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
  const skipToContent = useLinkClickHandler('#conteudo', {
    state: { instantScroll: true },
  })

  return (
    <MotionProvider>
      <SmoothScroll />
      <div className="site-shell" data-ready={ready}>
        <a className="skip-link" href="#conteudo" onClick={skipToContent}>
          Pular para o conteúdo
        </a>
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
