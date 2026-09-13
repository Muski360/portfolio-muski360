import { useEffect, useLayoutEffect, useRef, useSyncExternalStore } from 'react'
import {
  BrowserRouter,
  StaticRouter,
  Link,
  NavLink,
  Outlet,
  Route,
  Routes,
  useLocation,
  useNavigationType,
} from 'react-router-dom'
import {
  Film,
  FooterInvite,
  MotionControl,
  MotionProvider,
  Portrait,
} from './Media'
import { certifications, experiments, projects, skills } from './content'
import './App.css'

const email = 'mailto:murilodovigo@gmail.com'
const github = 'https://github.com/Muski360'
const linkedin = 'https://www.linkedin.com/in/murilo-dovigo-bastos-36b7a537a/'
const links = [
  ['01', '/sobre', 'Sobre'],
  ['02', '/projetos', 'Projetos'],
  ['03', '/experiencias', 'Experiências'],
]
const subscribeReady = () => () => {}

function Arrow({ diagonal = false }) {
  return (
    <svg
      className={diagonal ? 'arrow diagonal' : 'arrow'}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M4 12h16M12 4l8 8-8 8" />
    </svg>
  )
}
function DiskMark() {
  return (
    <svg className="disk-mark" viewBox="0 0 32 32" aria-hidden="true">
      <path fill="currentColor" d="M2 2h24l4 4v24H2z" />
      <path fill="var(--paper)" d="M8 2h15v11H8zM7 18h18v10H7z" />
      <path fill="currentColor" d="M17 4h4v7h-4z" />
    </svg>
  )
}
function Brand() {
  return (
    <Link
      className="brand"
      to="/"
      aria-label="MUSKI360 — Murilo Bastos, início"
    >
      <DiskMark />
      <span>
        MUSKI360<sup>↗</sup>
      </span>
    </Link>
  )
}
function PageMeta({ title, description }) {
  const { pathname } = useLocation()
  useEffect(() => {
    document.title = `${title} | Murilo Bastos — MUSKI360`
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', description)
    let canonical = document.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.append(canonical)
    }
    canonical.href = `https://muski360.dev${pathname}`
    const robots = document.querySelector('meta[name="robots"]')
    if (title !== 'Página não encontrada') robots?.remove()
    else if (!robots) {
      const noindex = document.createElement('meta')
      noindex.name = 'robots'
      noindex.content = 'noindex'
      document.head.append(noindex)
    }
  }, [title, description, pathname])
  return null
}
function RoutePosition() {
  const location = useLocation()
  const type = useNavigationType()
  const positions = useRef(new Map())
  const first = useRef(true)
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
    const target =
      location.hash && document.getElementById(location.hash.slice(1))
    if (target) target.scrollIntoView({ behavior: 'instant' })
    else
      window.scrollTo({
        top: type === 'POP' ? stored.get(key) || 0 : 0,
        behavior: 'instant',
      })
    if (!first.current)
      document.querySelector('main')?.focus({ preventScroll: true })
    first.current = false
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
function Layout() {
  const ready = useSyncExternalStore(
    subscribeReady,
    () => true,
    () => false,
  )
  const dialogRef = useRef(null)
  const location = useLocation()
  const closeMenu = () => dialogRef.current?.close()
  useEffect(() => {
    const dialog = dialogRef.current
    const unlock = () => {
      document.body.style.overflow = ''
    }
    dialog.addEventListener('close', unlock)
    return () => {
      dialog.removeEventListener('close', unlock)
      unlock()
    }
  }, [])
  return (
    <MotionProvider>
      <div className="site-shell" data-ready={ready}>
        <RoutePosition />
        <a className="skip-link" href="#conteudo">
          Pular para o conteúdo
        </a>
        <header className="site-header">
          <Brand />
          <nav className="desktop-nav" aria-label="Navegação principal">
            {links.map(([, to, label]) => (
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
              onClick={() => {
                dialogRef.current.showModal()
                document.body.style.overflow = 'hidden'
              }}
            >
              Menu <span>+</span>
            </button>
          </div>
        </header>
        <dialog
          className="menu-dialog"
          ref={dialogRef}
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
            {links.map(([number, to, label]) => (
              <NavLink key={to} to={to} onClick={closeMenu}>
                <small>{number}</small>
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
          {links.map(([, to, label]) => (
            <a key={to} href={to}>
              {label}
            </a>
          ))}
          <a href={email}>Contato ↗</a>
        </nav>
        <div className="route-content" key={location.pathname}>
          <Outlet />
        </div>
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
            <a href="#conteudo">Voltar ao topo ↑</a>
          </div>
        </footer>
      </div>
    </MotionProvider>
  )
}
function SectionLabel({ children, number }) {
  return (
    <div className="section-label">
      <span className="label-dot" />
      <span>{children}</span>
      {number && <span className="label-number">{number}</span>}
    </div>
  )
}
function TextLink({ to, href, children, external = false, className = '' }) {
  const content = (
    <>
      {children}
      <Arrow diagonal={external} />
    </>
  )
  return to ? (
    <Link className={`text-link ${className}`} to={to}>
      {content}
    </Link>
  ) : (
    <a
      className={`text-link ${className}`}
      href={href}
      {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
    >
      {content}
    </a>
  )
}
function DiskScene() {
  return (
    <div className="disk-scene">
      <div className="disk-stage">
        <span className="disk-orbit-label" aria-hidden="true">
          360°
        </span>
        <Film name="disk" priority />
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
function Home() {
  return (
    <main id="conteudo" tabIndex={-1}>
      <PageMeta
        title="Início"
        description="Portfólio de Murilo Bastos, desenvolvedor Full Stack em formação com foco em React, Spring Boot e inteligência artificial."
      />
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
          <a
            className="scroll-cue"
            href="#perfil"
            aria-label="Continuar para o perfil"
          >
            <span>↓</span>
          </a>
        </div>
      </section>
      <section className="profile-section section" id="perfil">
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
function ProjectCase({ project, index }) {
  return (
    <section
      className="project-section project-full project-case"
      id={project.id}
      style={{ '--project-color': project.color || '#deded4' }}
    >
      <div className="section project-heading">
        <div className="project-title-row">
          <h2>{project.name}</h2>
          <p>
            {project.category}
            <span>{project.type}</span>
          </p>
        </div>
      </div>
      <div className="project-stage">
        {project.graphic === 'court' && (
          <div className="court-lines" aria-hidden="true" />
        )}
        <div className="project-screen">
          <div className="screen-bar">
            <span>
              <i />
              <i />
              <i />
            </span>
            <span>{project.name}</span>
            <a
              href={project.repository}
              target="_blank"
              rel="noreferrer"
              aria-label={`Repositório do ${project.name}`}
            >
              ↗
            </a>
          </div>
          <Film
            name={project.id}
            src={project.video}
            poster={project.poster}
            alt={project.mediaAlt}
          />
        </div>
      </div>
      <div className="project-summary section">
        <span className="project-number" aria-hidden="true">
          {String(index + 1).padStart(2, '0')}
        </span>
        <div>
          <p>{project.description}</p>
          <div className="tech-line">{project.technologies.join(' · ')}</div>
        </div>
        <TextLink href={project.repository} external>
          Ver no GitHub
        </TextLink>
      </div>
      <div className="project-details section">
        <div>
          <h3>
            {project.detailTitle[0]}
            <br />
            <span className="serif-word">{project.detailTitle[1]}</span>
          </h3>
          <p>{project.detailText}</p>
        </div>
        <ol className="feature-list">
          {project.features.map(([title, description], i) => (
            <li key={title}>
              <span>{String(i + 1).padStart(2, '0')}</span>
              <div>
                <h4>{title}</h4>
                <p>{description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
function StackSection() {
  return (
    <section className="stack-section section">
      <div className="stack-layout">
        <div className="stack-intro">
          <h2>
            DA INTERFACE
            <br />
            <span className="serif-word">ao sistema.</span>
          </h2>
          <p>Ferramentas que fazem parte do meu caminho.</p>
          <Link className="small-link" to="/experiencias">
            Acompanhe minha formação <Arrow />
          </Link>
        </div>
        <div className="skill-list">
          {skills.map(([name, detail], index) => (
            <div className="skill-row" key={name}>
              <span className="row-index">0{index + 1}</span>
              <div>
                <h3>{name}</h3>
                <p>{detail}</p>
              </div>
              <span className="skill-tag">
                {['BACK', 'BACK', 'FRONT', 'DATA', 'FRONT', 'INFRA'][index]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
function AboutPage() {
  return (
    <main id="conteudo" tabIndex={-1}>
      <PageMeta
        title="Sobre"
        description="Conheça Murilo Bastos, sua trajetória no desenvolvimento de software, interesses e canais de contato."
      />
      <section className="about-hero section">
        <div className="about-hero-grid">
          <div>
            <p className="eyebrow">MURILO BASTOS / MUSKI360</p>
            <h1>
              CURIOSO
              <br />
              POR NATUREZA.
              <br />
              <span className="serif-word">Dev por escolha.</span>
            </h1>
            <p className="about-lead">
              Sou Murilo Bastos, tenho 17 anos e moro em Americana, São Paulo.
              Estudo desenvolvimento de software e quero construir minha
              carreira como Full Stack.
            </p>
            <a className="small-link" href="#historia">
              Minha história <span>↓</span>
            </a>
          </div>
          <figure className="about-portrait">
            <Portrait priority />
            <figcaption>MURILO BASTOS</figcaption>
          </figure>
        </div>
      </section>
      <section className="story-section section" id="historia">
        <SectionLabel>MINHA HISTÓRIA</SectionLabel>
        <div className="story-layout">
          <h2>
            APRENDO
            <br />
            <span className="serif-word">construindo.</span>
          </h2>
          <div>
            <p className="lead-copy">
              Meu interesse por programação começou cedo, movido pela vontade de
              entender o que existe por trás das interfaces. Hoje transformo
              essa curiosidade em sites, sistemas, APIs e projetos acadêmicos.
            </p>
            <p>
              No SENAI Americana, estudo diferentes etapas do desenvolvimento:
              levantamento de requisitos, front-end, back-end, bancos de dados,
              mobile e integração de sistemas. React e Spring Boot são as
              tecnologias que mais quero aprofundar.
            </p>
            <p>
              No tempo livre, exploro IA generativa, agentes e automação. Minha
              experiência anterior com edição de vídeo também influencia meu
              olhar para composição, ritmo e experiências digitais.
            </p>
          </div>
        </div>
        <div className="facts">
          <div>
            <span>17</span>
            <p>ANOS</p>
          </div>
          <div>
            <span>03/04</span>
            <p>TERMOS NO SENAI</p>
          </div>
          <div>
            <span>EN</span>
            <p>INGLÊS AVANÇADO</p>
          </div>
          <div>
            <span>FULL</span>
            <p>STACK COMO OBJETIVO</p>
          </div>
        </div>
      </section>
      <StackSection />
      <section className="contact-section section">
        <div>
          <p className="eyebrow">CONTATO</p>
          <h2>
            Vamos trocar
            <br />
            <span className="serif-word">uma ideia?</span>
          </h2>
        </div>
        <div className="contact-links">
          <a href={email}>
            <span>E-mail</span>
            <strong>murilodovigo@gmail.com</strong>
            <Arrow diagonal />
          </a>
          <a href={github} target="_blank" rel="noreferrer">
            <span>GitHub</span>
            <strong>@Muski360</strong>
            <Arrow diagonal />
          </a>
          <a href={linkedin} target="_blank" rel="noreferrer">
            <span>LinkedIn</span>
            <strong>Murilo Dovigo Bastos</strong>
            <Arrow diagonal />
          </a>
        </div>
      </section>
    </main>
  )
}
function ProjectsPage() {
  return (
    <main id="conteudo" tabIndex={-1}>
      <PageMeta
        title="Projetos"
        description="Projetos e experimentos de Murilo Bastos em desenvolvimento web, APIs, inteligência artificial e mobile."
      />
      <section className="work-hero section">
        <div className="work-hero-title">
          <h1>
            IDEIAS QUE
            <br />
            GANHARAM <span className="serif-word">código.</span>
          </h1>
          <a
            className="work-jump"
            href="#projetos"
            aria-label="Explorar projetos"
          >
            <Arrow />
          </a>
        </div>
        <div className="work-hero-bottom">
          <p>
            Projetos pessoais e acadêmicos onde testo tecnologias, resolvo
            problemas e construo aplicações de ponta a ponta.
          </p>
        </div>
      </section>
      <div className="project-collection" id="projetos">
        {projects.map((project, index) => (
          <ProjectCase key={project.id} project={project} index={index} />
        ))}
      </div>
      <section className="experiments-section section">
        <div className="experiments-heading">
          <h2>
            ESTUDOS<span className="serif-word"> & experimentos.</span>
          </h2>
        </div>
        <div className="experiment-list">
          {experiments.map((item, index) => (
            <article key={item.area}>
              <span className="row-index">0{index + 1}</span>
              <h3>{item.area}</h3>
              <div>
                <p>{item.text}</p>
                <div className="repo-links">
                  {item.projects.split(' · ').map((project) => (
                    <a
                      key={project}
                      href={`${github}/${project}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {project}
                      <span>↗</span>
                    </a>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
        <TextLink href={`${github}?tab=repositories`} external>
          Ver todos no GitHub
        </TextLink>
      </section>
    </main>
  )
}
function ExperiencePage() {
  return (
    <main id="conteudo" tabIndex={-1}>
      <PageMeta
        title="Experiências"
        description="Formação, prática em projetos e certificações de Murilo Bastos."
      />
      <section className="experience-hero section">
        <SectionLabel number="03 / EXPERIÊNCIAS">
          FORMAÇÃO E PRÁTICA
        </SectionLabel>
        <div className="experience-hero-grid">
          <h1>
            CONSTRUINDO
            <br />A BASE.<span className="serif-word">Um projeto por vez.</span>
          </h1>
          <div className="term-composition">
            <span className="eyebrow">SENAI / DESENVOLVIMENTO DE SISTEMAS</span>
            <span className="term-current">
              03<span>/04</span>
            </span>
            <div className="term-track" role="img" aria-label="3º de 4 termos">
              <i />
              <i />
              <i />
              <i />
            </div>
            <span className="eyebrow">TERMOS / EM ANDAMENTO</span>
          </div>
        </div>
        <p className="experience-lead">
          Minha experiência vem da formação técnica, de projetos acadêmicos e da
          experimentação. Ainda não tenho experiência profissional formal.
        </p>
      </section>
      <section className="timeline-section section">
        <SectionLabel>FORMAÇÃO</SectionLabel>
        <div className="timeline-heading">
          <h2>
            ONDE ESTOU
            <br />
            <span className="serif-word">aprendendo.</span>
          </h2>
        </div>
        <div className="timeline-list">
          <article>
            <span className="timeline-date">2025 — 2026</span>
            <div>
              <p className="eyebrow">EM ANDAMENTO · 3º DE 4 TERMOS</p>
              <h3>Técnico em Desenvolvimento de Sistemas</h3>
              <strong>SENAI São Paulo · Americana</strong>
              <p>
                Lógica, front-end, back-end, APIs, bancos de dados, mobile,
                integração de sistemas, Git e projetos em equipe.
              </p>
            </div>
            <span className="timeline-dot" aria-hidden="true" />
          </article>
          <article>
            <span className="timeline-date">2024 — 2026</span>
            <div>
              <p className="eyebrow">EM ANDAMENTO</p>
              <h3>Ensino Médio</h3>
              <strong>SESI CE 101</strong>
            </div>
            <span className="timeline-dot" aria-hidden="true" />
          </article>
        </div>
      </section>
      <section className="practice-section section">
        <p className="eyebrow">EXPERIÊNCIA PRÁTICA</p>
        <h2>
          SITES, SISTEMAS,
          <br />
          APIs E <span className="serif-word">experimentos.</span>
        </h2>
        <div>
          <p>
            Aplico o conteúdo do curso em projetos próprios e acadêmicos. Esse
            trabalho inclui autenticação, CRUD, bancos relacionais, regras de
            negócio, interfaces e configuração de ambientes com Docker.
          </p>
          <TextLink to="/projetos">Conhecer projetos</TextLink>
        </div>
        <span className="practice-symbol" aria-hidden="true">
          ↗
        </span>
      </section>
      <section className="certifications-section section">
        <SectionLabel>CERTIFICAÇÕES</SectionLabel>
        <div className="certifications-heading">
          <h2>
            TÉCNICA &<br />
            <span className="serif-word">repertório criativo.</span>
          </h2>
          <p>Do código ao ritmo de edição.</p>
        </div>
        <div className="certificate-list">
          {certifications.map((certificate, index) => {
            const content = (
              <>
                <span className="row-index">0{index + 1}</span>
                <div>
                  <small>{certificate.type}</small>
                  <h3>{certificate.name}</h3>
                  <p>{certificate.org}</p>
                </div>
                <time>{certificate.date}</time>
                {certificate.url ? (
                  <Arrow diagonal />
                ) : (
                  <span
                    className="certificate-seal"
                    aria-label="Certificação técnica"
                  >
                    ↗
                  </span>
                )}
              </>
            )
            return certificate.url ? (
              <a
                key={certificate.name}
                href={certificate.url}
                target="_blank"
                rel="noreferrer"
              >
                {content}
              </a>
            ) : (
              <article key={certificate.name}>{content}</article>
            )
          })}
        </div>
      </section>
    </main>
  )
}
function NotFound() {
  return (
    <main id="conteudo" tabIndex={-1}>
      <PageMeta
        title="Página não encontrada"
        description="A página solicitada não existe."
      />
      <section className="not-found section">
        <div className="not-found-composition" aria-hidden="true">
          <span className="error-digit">4</span>
          <img
            src="/media/disk-original.webp"
            alt=""
            width="1280"
            height="1280"
            fetchPriority="high"
          />
          <span className="error-digit">4</span>
        </div>
        <div className="not-found-bottom">
          <div>
            <h1>
              <span className="sr-only">404 — </span>Página não encontrada.
            </h1>
            <p>Confira o endereço ou volte ao início.</p>
          </div>
          <TextLink to="/">Voltar ao início</TextLink>
        </div>
      </section>
    </main>
  )
}
export default function App({ serverLocation }) {
  const Router = serverLocation ? StaticRouter : BrowserRouter
  return (
    <Router location={serverLocation}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="sobre" element={<AboutPage />} />
          <Route path="projetos" element={<ProjectsPage />} />
          <Route path="experiencias" element={<ExperiencePage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  )
}
