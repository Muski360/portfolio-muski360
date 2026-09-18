import { Brand } from './Brand'
import { FooterInvite } from './FooterInvite'
import { Arrow } from '../ui/Arrow'
import { email, github, linkedin } from '../../data/site'

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
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
        <span>© {new Date().getFullYear()} Murilo Bastos</span>
        <Link to="#conteudo">Voltar ao topo ↑</Link>
      </div>
    </footer>
  )
}
import { Link } from 'react-router-dom'
