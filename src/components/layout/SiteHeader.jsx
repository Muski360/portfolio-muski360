import { useEffect, useLayoutEffect, useRef } from 'react'
import { useLenis } from 'lenis/react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Brand } from './Brand'
import { Arrow } from '../ui/Arrow'
import { MotionControl } from '../motion/MotionControl'
import { email } from '../../data/site'
import { navigation } from '../../routes'

export function SiteHeader() {
  const dialogRef = useRef(null)
  const previousOverflow = useRef(null)
  const location = useLocation()
  const lenis = useLenis()
  const closeMenu = () => dialogRef.current?.close()
  const openMenu = () => {
    if (dialogRef.current.open) return
    lenis?.stop()
    previousOverflow.current = document.body.style.overflow
    dialogRef.current.showModal()
    document.body.style.overflow = 'hidden'
  }

  // Back/forward navigation can change the route while the dialog is open.
  // Release the modal before the new route receives keyboard focus.
  useLayoutEffect(() => {
    dialogRef.current?.close()
  }, [location.key])

  useEffect(() => {
    if (!lenis) return
    const dialog = dialogRef.current
    if (dialog.open) lenis.stop()
    const resume = () => lenis.start()
    dialog.addEventListener('close', resume)
    return () => dialog.removeEventListener('close', resume)
  }, [lenis])

  useEffect(() => {
    const dialog = dialogRef.current
    const unlock = () => {
      if (previousOverflow.current === null) return
      document.body.style.overflow = previousOverflow.current
      previousOverflow.current = null
    }
    dialog.addEventListener('close', unlock)
    return () => {
      dialog.removeEventListener('close', unlock)
      unlock()
    }
  }, [])

  return (
    <>
      <header className="site-header">
        <Brand />
        <nav className="desktop-nav" aria-label="Navegação principal">
          {navigation.map(({ path: to, title: label }) => (
            <NavLink key={to} to={to}>
              {label}
            </NavLink>
          ))}
          <a className="header-contact" href={email}>
            Vamos conversar <Arrow diagonal />
          </a>
        </nav>
        <div className="header-controls">
          <MotionControl />
          <button
            className="menu-toggle"
            type="button"
            aria-haspopup="dialog"
            aria-controls="site-menu"
            onClick={() => {
              openMenu()
            }}
          >
            Menu <span>+</span>
          </button>
        </div>
      </header>
      <dialog
        data-lenis-prevent
        className="menu-dialog"
        ref={dialogRef}
        id="site-menu"
        aria-label="Menu de navegação"
        onClick={(event) => {
          if (event.target === event.currentTarget) closeMenu()
        }}
      >
        <div className="menu-top">
          <span>MUSKI360 / ÍNDICE</span>
          <button
            type="button"
            className="menu-close"
            onClick={closeMenu}
            autoFocus
          >
            Fechar <span>×</span>
          </button>
        </div>
        <nav aria-label="Navegação mobile">
          <Link to="/" onClick={closeMenu}>
            <small>00</small>Início
            <Arrow />
          </Link>
          {navigation.map(({ path: to, title: label }, index) => (
            <NavLink key={to} to={to} onClick={closeMenu}>
              <small>{String(index + 1).padStart(2, '0')}</small>
              {label}
              <Arrow />
            </NavLink>
          ))}
        </nav>
        <a className="menu-email" href={email} onClick={closeMenu}>
          murilodovigo@gmail.com <Arrow diagonal />
        </a>
        <p>Americana, São Paulo · Brasil</p>
      </dialog>
      <nav className="fallback-nav" aria-label="Navegação sem JavaScript">
        {navigation.map(({ path: to, title: label }) => (
          <a key={to} href={to}>
            {label}
          </a>
        ))}
        <a href={email}>Contato ↗</a>
      </nav>
    </>
  )
}
