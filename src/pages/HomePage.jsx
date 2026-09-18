import { Link } from 'react-router-dom'
import { Film } from '../components/media/Film'
import { Portrait } from '../components/media/Portrait'
import { Arrow } from '../components/ui/Arrow'
import { TextLink } from '../components/ui/TextLink'

function DiskScene() {
  return (
    <div className="disk-scene">
      <div className="disk-stage">
        <span className="disk-orbit-label" aria-hidden="true">
          360°
        </span>
        <Film variant="disk" name="MUSKI360" priority />
      </div>
    </div>
  )
}

function PortfolioOverview() {
  return (
    <section className="portfolio-overview" aria-label="Explore o portfólio">
      <Link className="overview-link overview-projects" to="/projetos">
        <div>
          <h2>PROJETOS</h2>
          <Arrow diagonal />
        </div>
        <p>Aplicações web, APIs e outros estudos.</p>
      </Link>
      <Link className="overview-link overview-education" to="/experiencias">
        <div>
          <h2>FORMAÇÃO</h2>
          <Arrow diagonal />
        </div>
        <p>SENAI Americana, prática e certificações.</p>
      </Link>
    </section>
  )
}
export default function HomePage() {
  return (
    <main id="conteudo" tabIndex={-1}>
      <section className="home-hero" id="inicio">
        <div className="hero-overline">
          <span>
            <i /> DESENVOLVEDOR EM FORMAÇÃO
          </span>
          <span>AMERICANA, SÃO PAULO — BRASIL</span>
        </div>
        <div className="hero-composition">
          <div className="hero-name">
            <h1>
              <span>MURILO</span>
              <span>
                BASTOS<span className="name-dot">.</span>
              </span>
            </h1>
          </div>
          <DiskScene />
        </div>
        <div className="hero-bottom">
          <Link className="hero-project-link" to="/projetos">
            Ver projetos
            <Arrow diagonal />
          </Link>
          <p>
            Tenho 17 anos e construo sistemas, interfaces e experimentos
            enquanto estudo React, Spring Boot e IA.
          </p>
          <Link
            className="scroll-cue"
            to="#perfil"
            aria-label="Continuar para o perfil"
          >
            <span>↓</span>
          </Link>
        </div>
      </section>
      <section className="profile-section section" id="perfil" tabIndex={-1}>
        <div className="profile-layout">
          <figure className="portrait-frame">
            <Portrait />
            <figcaption>
              <span>MURILO BASTOS</span>
              <span>17 ANOS / SP</span>
            </figcaption>
          </figure>
          <div className="profile-copy">
            <h2>
              Primeiro,
              <br />
              entender.
              <br />
              <span className="serif-word">Depois, criar.</span>
            </h2>
            <p className="profile-statement">
              Gosto de entender como as coisas funcionam e criar minha própria
              versão.
            </p>
            <div className="profile-detail">
              <p>
                Curso Técnico em Desenvolvimento de Sistemas no SENAI Americana.
                Meu foco atual combina React no front-end e Java com Spring Boot
                no back-end.
              </p>
              <p>
                Também estudo inteligência artificial, automação e novas
                ferramentas para criar produtos melhores.
              </p>
            </div>
            <TextLink to="/sobre">Conheça minha história</TextLink>
          </div>
        </div>
      </section>
      <PortfolioOverview />
    </main>
  )
}
