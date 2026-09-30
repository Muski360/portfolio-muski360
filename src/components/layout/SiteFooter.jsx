import { NavLink, useLinkClickHandler } from 'react-router-dom'
import { Brand } from './Brand'
import { FooterInvite } from './FooterInvite'
import { Arrow } from '../ui/Arrow'
import { email, github, linkedin } from '../../data/site'
import { navigation } from '../../routes'

export function SiteFooter() {
  const backToTop = useLinkClickHandler('#conteudo')
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <nav className="footer-nav" aria-label="Explore o portfólio">
          {navigation.map(({ path, title }) => (
            <NavLink key={path} to={path}>{title}</NavLink>
          ))}
        </nav>
        <span className="footer-location">
          AMERICANA, SP
          <br />
          BRASIL
        </span>
      </div>
      <FooterInvite href={email} />
      <div className="footer-links">
        <a href={email}>
          murilodovigo@gmail.com <Arrow diagonal />
        </a>
        <div>
          <a href={github} target="_blank" rel="noreferrer">
            GitHub <Arrow diagonal />
          </a>
          <a href={linkedin} target="_blank" rel="noreferrer">
            LinkedIn <Arrow diagonal />
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <Brand />
        <span>© {new Date().getFullYear()} Murilo Dovigo</span>
        <a href="#conteudo" onClick={backToTop}>
          Voltar ao topo ↑
        </a>
      </div>
    </footer>
  )
}
