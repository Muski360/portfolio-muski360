import { useEffect, useRef, useState } from 'react'
import { BrowserRouter, Link, NavLink, Outlet, Route, Routes, useLocation } from 'react-router-dom'
import './App.css'

const skills = [
  ['Java', 'Base para back-end e orientação a objetos'],
  ['Spring Boot', 'APIs e aplicações web'],
  ['React', 'Interfaces componentizadas'],
  ['PostgreSQL', 'Modelagem e consultas relacionais'],
  ['JavaScript', 'Interação e lógica no front-end'],
  ['Docker', 'Ambientes e infraestrutura básica'],
]

const experiments = [
  { area: 'Frontend', projects: 'EstudosReact · SimuladoSAEP-Angular', text: 'Estudos de interfaces, componentes e aplicações com React e Angular.' },
  { area: 'Backend & APIs', projects: 'API_crud · Estudo_API · biblioteca_api_json', text: 'Exercícios com APIs, operações CRUD, persistência e regras de negócio.' },
  { area: 'IA & Python', projects: 'Curso_IA_SENAI · curso_python · curso_ds_projetos', text: 'Experimentos com Python, dados e inteligência artificial aplicada.' },
  { area: 'Mobile & outros', projects: 'mobile · fit_life · gamestore', text: 'Projetos que ampliam o contato com mobile e diferentes formatos de produto.' },
]

const certifications = [
  { name: 'Inteligências Artificiais Generativas Aplicada a Programação', org: 'SENAI São Paulo', date: 'jul 2026', type: 'Técnica' },
  { name: 'Programação em Python com Framework', org: 'SENAI São Paulo', date: 'dez 2025', type: 'Técnica' },
  { name: 'Produção de vídeo: conceitos essenciais', org: 'Alura', date: 'set 2023', url: 'https://cursos.alura.com.br/certificate/d1e7f5cd-269c-4d79-838d-0b05782a1a35?lang', type: 'Audiovisual' },
  { name: 'Premiere: ritmo de edição e manipulando emoções', org: 'Alura', date: 'out 2023', url: 'https://cursos.alura.com.br/certificate/a95aa906-c66a-4060-97c5-3f29f85465cc?lang', type: 'Audiovisual' },
  { name: 'Adobe Premiere: vídeos institucionais', org: 'Alura', date: 'dez 2023', url: 'https://cursos.alura.com.br/certificate/b5f68625-355f-40aa-b474-f6d659449d4a?lang', type: 'Audiovisual' },
  { name: 'Adobe Premiere 2020: edição de vídeo', org: 'Alura', date: 'out 2023', url: 'https://cursos.alura.com.br/certificate/8fb6e198-5e97-40c0-9d4c-784c30ca79f3?lang', type: 'Audiovisual' },
]

function ArrowIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
}

function PageMeta({ title, description }) {
  useEffect(() => {
    document.title = `${title} | Murilo Bastos`
    document.querySelector('meta[name="description"]')?.setAttribute('content', description)
  }, [title, description])
  return null
}

function Layout() {
  const [menuOpen, setMenuOpen] = useState(false)
  const glowRef = useRef(null)
  const location = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [location.pathname])

  useEffect(() => {
    const onPointerMove = (event) => {
      glowRef.current?.style.setProperty('--mouse-x', `${event.clientX}px`)
      glowRef.current?.style.setProperty('--mouse-y', `${event.clientY}px`)
    }
    window.addEventListener('pointermove', onPointerMove)
    return () => window.removeEventListener('pointermove', onPointerMove)
  }, [])

  return (
    <div className="site-shell" ref={glowRef}>
      <header className="nav">
        <Link className="brand" to="/" aria-label="Murilo Bastos, página inicial">M<span>.</span></Link>
        <button className="menu-button" type="button" aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}><span /><span /></button>
        <nav className={menuOpen ? 'nav-links is-open' : 'nav-links'} aria-label="Navegação principal">
          <NavLink to="/sobre" onClick={() => setMenuOpen(false)}>Sobre</NavLink>
          <NavLink to="/projetos" onClick={() => setMenuOpen(false)}>Projetos</NavLink>
          <NavLink to="/experiencias" onClick={() => setMenuOpen(false)}>Experiências</NavLink>
          <a className="nav-cta" href="mailto:murilodovigo@gmail.com" onClick={() => setMenuOpen(false)}>Contato</a>
        </nav>
      </header>
      <Outlet />
      <footer>
        <Link className="brand" to="/">M<span>.</span></Link>
        <p>Desenvolvido com curiosidade.</p>
        <a href="mailto:murilodovigo@gmail.com">murilodovigo@gmail.com</a>
        <span>© {new Date().getFullYear()} Murilo</span>
      </footer>
    </div>
  )
}

function Home() {
  return (
    <main>
      <PageMeta title="Início" description="Portfólio de Murilo Bastos, desenvolvedor Full Stack em formação com foco em React, Spring Boot e inteligência artificial." />
      <section className="hero" id="inicio">
        <div className="hero-grid" aria-hidden="true" />
        <div className="orb" aria-hidden="true"><div className="orb-core">M</div><span className="orbit orbit-one"><i /></span><span className="orbit orbit-two"><i /></span></div>
        <div className="hero-content">
          <p className="eyebrow hero-enter delay-one"><span /> Full Stack developer in progress</p>
          <h1 className="hero-enter delay-two">Murilo<br /><strong>Bastos.</strong></h1>
          <p className="hero-copy hero-enter delay-three">Tenho 17 anos e construo sistemas, interfaces e experimentos enquanto estudo React, Spring Boot e IA.</p>
          <div className="hero-actions hero-enter delay-four">
            <Link className="button button-primary" to="/projetos">Ver projetos <ArrowIcon /></Link>
            <Link className="text-link" to="/sobre">Quem sou <span>→</span></Link>
          </div>
        </div>
        <div className="hero-foot"><span>Americana, SP</span><span className="scroll-label">Em constante evolução <i /></span></div>
      </section>

      <section className="about section home-intro">
        <div className="section-index">01 / PERFIL</div>
        <div className="about-copy">
          <p className="section-kicker">Código, produto e curiosidade</p>
          <h2>Gosto de entender como as coisas funcionam e criar minha própria versão.</h2>
          <div className="about-columns">
            <p>Curso Técnico em Desenvolvimento de Sistemas no SENAI Americana. Meu foco atual combina React no front-end e Java com Spring Boot no back-end.</p>
            <div className="inline-action"><p>Também estudo inteligência artificial, automação e novas ferramentas para criar produtos melhores.</p><Link to="/sobre">Conheça minha história <ArrowIcon /></Link></div>
          </div>
        </div>
      </section>

      <section className="featured-teaser section">
        <div className="project-mark" aria-hidden="true">M/01</div>
        <div className="featured-copy">
          <p className="section-kicker">Projeto em destaque</p>
          <h2>Mentup</h2>
          <p>Uma plataforma web para organizar campeonatos de vôlei de praia, das equipes ao mata-mata.</p>
          <Link className="button button-primary" to="/projetos">Explorar projeto <ArrowIcon /></Link>
        </div>
      </section>

      <section className="stack section">
        <div className="stack-heading"><div className="section-index">02 / STACK</div><div><p className="section-kicker">Tecnologias em estudo</p><h2>Ferramentas que fazem parte do meu caminho.</h2></div></div>
        <div className="skill-list">{skills.map(([name, detail], index) => <div className="skill-row" key={name}><span className="skill-number">0{index + 1}</span><h3>{name}</h3><p>{detail}</p><span className="skill-arrow"><ArrowIcon /></span></div>)}</div>
      </section>
    </main>
  )
}

function PageHero({ index, kicker, title, children, word }) {
  return (
    <section className="page-hero">
      <div className="hero-grid" aria-hidden="true" />
      <span className="page-watermark" aria-hidden="true">{word}</span>
      <div className="page-hero-head"><span className="section-index">{index}</span><p className="eyebrow"><span /> {kicker}</p></div>
      <h1>{title}</h1>
      <div className="page-lead">{children}</div>
    </section>
  )
}

function AboutPage() {
  return (
    <main>
      <PageMeta title="Sobre" description="Conheça Murilo Bastos, sua trajetória no desenvolvimento de software, interesses e canais de contato." />
      <PageHero index="01 / SOBRE" kicker="Pessoa por trás do código" title={<>Curioso por natureza.<br /><strong>Dev por escolha.</strong></>} word="ABOUT">
        <p>Sou Murilo Bastos, tenho 17 anos e moro em Americana, São Paulo. Estudo desenvolvimento de software e quero construir minha carreira como Full Stack.</p>
      </PageHero>

      <section className="story section">
        <div className="section-index">MINHA HISTÓRIA</div>
        <div className="story-body">
          <h2>Aprendo construindo.</h2>
          <p>Meu interesse por programação começou cedo, movido pela vontade de entender o que existe por trás das interfaces. Hoje transformo essa curiosidade em sites, sistemas, APIs e projetos acadêmicos.</p>
          <p>No SENAI Americana, estudo diferentes etapas do desenvolvimento: levantamento de requisitos, front-end, back-end, bancos de dados, mobile e integração de sistemas. React e Spring Boot são as tecnologias que mais quero aprofundar.</p>
          <p>No tempo livre, exploro IA generativa, agentes e automação. Minha experiência anterior com edição de vídeo também influencia meu olhar para composição, ritmo e experiências digitais.</p>
        </div>
      </section>

      <section className="facts section">
        <div><span>17</span><p>anos</p></div><div><span>03/04</span><p>termos no SENAI</p></div><div><span>EN</span><p>inglês avançado</p></div><div><span>FULL</span><p>stack como objetivo</p></div>
      </section>

      <section className="contact-page section">
        <div><p className="section-kicker">Contato</p><h2>Vamos trocar<br />uma ideia?</h2></div>
        <div className="contact-links">
          <a href="mailto:murilodovigo@gmail.com"><span>E-mail</span><strong>murilodovigo@gmail.com</strong><ArrowIcon /></a>
          <a href="https://github.com/Muski360" target="_blank" rel="noreferrer"><span>GitHub</span><strong>@Muski360</strong><ArrowIcon /></a>
          <a href="https://www.linkedin.com/in/murilo-dovigo-bastos-36b7a537a/" target="_blank" rel="noreferrer"><span>LinkedIn</span><strong>Murilo Dovigo Bastos</strong><ArrowIcon /></a>
        </div>
      </section>
    </main>
  )
}

function ProjectsPage() {
  return (
    <main>
      <PageMeta title="Projetos" description="Projetos e experimentos de Murilo Bastos em desenvolvimento web, APIs, inteligência artificial e mobile." />
      <PageHero index="02 / PROJETOS" kicker="Aprendizado colocado em prática" title={<>Ideias que ganharam<br /><strong>código.</strong></>} word="WORK">
        <p>Projetos pessoais e acadêmicos onde testo tecnologias, resolvo problemas e construo aplicações de ponta a ponta.</p>
      </PageHero>

      <section className="project-feature section">
        <div className="project-visual" aria-hidden="true"><span>MENTUP</span><div className="bracket-lines"><i /><i /><i /><i /></div><b>01</b></div>
        <div className="project-detail">
          <div className="project-meta"><span>Projeto principal</span><span>Aplicação web</span></div>
          <h2>Mentup</h2>
          <p>Plataforma para criação e gerenciamento de campeonatos de vôlei de praia. O sistema reúne usuários, times, jogadores, fases, partidas, resultados e classificação.</p>
          <ul><li>Geração automática de partidas e fases</li><li>Grupos, pontos corridos e mata-mata</li><li>Autenticação e modelagem relacional</li><li>Resultados por sets e avanço automático</li></ul>
          <div className="tech-line">PHP 8.3 · PostgreSQL · JavaScript · Docker · Apache</div>
          <a className="button button-primary" href="https://github.com/Muski360/Mentup" target="_blank" rel="noreferrer">Ver no GitHub <ArrowIcon /></a>
        </div>
      </section>

      <section className="experiments section">
        <div className="section-title-row"><span className="section-index">OUTROS ESTUDOS</span><h2>Exploração também faz parte do processo.</h2></div>
        <div className="experiment-list">{experiments.map((item, index) => <article key={item.area}><span>0{index + 1}</span><div><h3>{item.area}</h3><p>{item.text}</p><code>{item.projects}</code></div></article>)}</div>
        <a className="text-link external-link" href="https://github.com/Muski360?tab=repositories" target="_blank" rel="noreferrer">Ver todos no GitHub <span>↗</span></a>
      </section>
    </main>
  )
}

function ExperiencePage() {
  return (
    <main>
      <PageMeta title="Experiências" description="Formação, prática em projetos e certificações de Murilo Bastos." />
      <PageHero index="03 / EXPERIÊNCIAS" kicker="Formação e prática" title={<>Construindo a base.<br /><strong>Um projeto por vez.</strong></>} word="PATH">
        <p>Minha experiência vem da formação técnica, de projetos acadêmicos e da experimentação. Ainda não tenho experiência profissional formal.</p>
      </PageHero>

      <section className="timeline section">
        <div className="section-title-row"><span className="section-index">FORMAÇÃO</span><h2>Onde estou aprendendo.</h2></div>
        <div className="timeline-list">
          <article><span className="timeline-date">2025 — 2026</span><div><p className="section-kicker">Em andamento · 3º de 4 termos</p><h3>Técnico em Desenvolvimento de Sistemas</h3><strong>SENAI São Paulo · Americana</strong><p>Lógica, front-end, back-end, APIs, bancos de dados, mobile, integração de sistemas, Git e projetos em equipe.</p></div></article>
          <article><span className="timeline-date">2024 — 2026</span><div><p className="section-kicker">Em andamento</p><h3>Ensino Médio</h3><strong>SESI CE 101</strong></div></article>
        </div>
      </section>

      <section className="practice-band section">
        <span className="section-index">EXPERIÊNCIA PRÁTICA</span>
        <h2>Sites, sistemas, APIs e experimentos.</h2>
        <p>Aplico o conteúdo do curso em projetos próprios e acadêmicos. Esse trabalho inclui autenticação, CRUD, bancos relacionais, regras de negócio, interfaces e configuração de ambientes com Docker.</p>
        <Link className="button button-primary" to="/projetos">Conhecer projetos <ArrowIcon /></Link>
      </section>

      <section className="certifications section">
        <div className="section-title-row"><span className="section-index">CERTIFICAÇÕES</span><h2>Técnica e repertório criativo.</h2></div>
        <div className="certificate-list">{certifications.map((certificate, index) => {
          const content = <><span className="certificate-number">0{index + 1}</span><div><small>{certificate.type}</small><h3>{certificate.name}</h3><p>{certificate.org}</p></div><time>{certificate.date}</time>{certificate.url && <span className="certificate-arrow">↗</span>}</>
          return certificate.url ? <a key={certificate.name} href={certificate.url} target="_blank" rel="noreferrer">{content}</a> : <article key={certificate.name}>{content}</article>
        })}</div>
      </section>
    </main>
  )
}

function NotFound() {
  return <main><PageMeta title="Página não encontrada" description="A página solicitada não existe." /><section className="not-found"><span>404</span><h1>Página não encontrada.</h1><Link className="button button-primary" to="/">Voltar ao início <ArrowIcon /></Link></section></main>
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="sobre" element={<AboutPage />} />
          <Route path="projetos" element={<ProjectsPage />} />
          <Route path="experiencias" element={<ExperiencePage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
