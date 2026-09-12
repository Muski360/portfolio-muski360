import { useEffect, useRef, useState } from 'react'
import './App.css'

const skills = [
  { name: 'Java', detail: 'Orientação a objetos e base para back-end' },
  { name: 'Spring Boot', detail: 'APIs e aplicações robustas' },
  { name: 'React', detail: 'Interfaces modernas e componentizadas' },
  { name: 'Angular', detail: 'Aplicações front-end estruturadas' },
  { name: 'PostgreSQL', detail: 'Dados relacionais e consultas SQL' },
  { name: 'PHP', detail: 'Desenvolvimento para a web' },
]

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const glowRef = useRef(null)

  useEffect(() => {
    const onPointerMove = (event) => {
      if (!glowRef.current) return
      glowRef.current.style.setProperty('--mouse-x', `${event.clientX}px`)
      glowRef.current.style.setProperty('--mouse-y', `${event.clientY}px`)
    }

    window.addEventListener('pointermove', onPointerMove)
    return () => window.removeEventListener('pointermove', onPointerMove)
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <div className="site-shell" ref={glowRef}>
      <header className="nav">
        <a className="brand" href="#inicio" aria-label="Murilo — início">M<span>.</span></a>
        <button className="menu-button" type="button" aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>
          <span /><span />
        </button>
        <nav className={menuOpen ? 'nav-links is-open' : 'nav-links'} aria-label="Navegação principal">
          <a href="#sobre" onClick={closeMenu}>Sobre</a>
          <a href="#stack" onClick={closeMenu}>Stack</a>
          <a href="#jornada" onClick={closeMenu}>Jornada</a>
          <a className="nav-cta" href="#contato" onClick={closeMenu}>Vamos conversar</a>
        </nav>
      </header>

      <main>
        <section className="hero" id="inicio">
          <div className="hero-grid" aria-hidden="true" />
          <div className="orb" aria-hidden="true">
            <div className="orb-core">M</div>
            <span className="orbit orbit-one"><i /></span>
            <span className="orbit orbit-two"><i /></span>
          </div>
          <div className="hero-content">
            <p className="eyebrow hero-enter delay-one"><span /> Desenvolvedor em formação</p>
            <h1 className="hero-enter delay-two">Olá, eu sou<br /><strong>Murilo.</strong></h1>
            <p className="hero-copy hero-enter delay-three">Transformo curiosidade em código e aprendizado em evolução.</p>
            <div className="hero-actions hero-enter delay-four">
              <a className="button button-primary" href="#sobre">Conheça minha jornada <ArrowIcon /></a>
              <a className="text-link" href="#stack">Explorar tecnologias <span>↓</span></a>
            </div>
          </div>
          <div className="hero-foot">
            <span>São Paulo, Brasil</span>
            <span className="scroll-label">Role para descobrir <i /></span>
          </div>
        </section>

        <section className="about section" id="sobre">
          <div className="section-index">01 / SOBRE</div>
          <div className="about-copy">
            <p className="section-kicker">Minha história</p>
            <h2>A curiosidade veio primeiro. O código veio logo depois.</h2>
            <div className="about-columns">
              <p>Desde a infância, programação sempre despertou algo em mim: a vontade de entender como as coisas funcionam e de criar minhas próprias soluções.</p>
              <p>Hoje curso Técnico em Desenvolvimento de Sistemas no <strong>SENAI</strong>. Meu próximo passo é Ciência da Computação — e o objetivo é seguir evoluindo até me tornar um desenvolvedor profissional completo.</p>
            </div>
          </div>
        </section>

        <section className="ai-section section" id="jornada">
          <div className="ai-visual" aria-hidden="true">
            <div className="code-lines">
              <span>curiosity.initialize();</span>
              <span>while (learning) {'{'}</span>
              <span>&nbsp;&nbsp;murilo.evolve();</span>
              <span>{'}'}</span>
            </div>
            <div className="signal signal-one" /><div className="signal signal-two" /><div className="signal signal-three" />
          </div>
          <div className="ai-copy">
            <p className="section-kicker">O que me move</p>
            <h2>Aprender é meu estado padrão.</h2>
            <p>Inteligência artificial é uma das áreas que mais me fascinam. Gosto de explorar novas ideias, fazer perguntas e descobrir como a tecnologia pode ampliar o que somos capazes de criar.</p>
            <blockquote>“Cada projeto é uma nova versão de mim mesmo.”</blockquote>
          </div>
        </section>

        <section className="stack section" id="stack">
          <div className="stack-heading">
            <div className="section-index">02 / STACK</div>
            <div><p className="section-kicker">Tecnologias em evolução</p><h2>Ferramentas que fazem parte do meu caminho.</h2></div>
          </div>
          <div className="skill-list">
            {skills.map((skill, index) => (
              <div className="skill-row" key={skill.name} tabIndex="0">
                <span className="skill-number">0{index + 1}</span><h3>{skill.name}</h3><p>{skill.detail}</p><span className="skill-arrow"><ArrowIcon /></span>
              </div>
            ))}
          </div>
          <p className="learning-note"><span>+</span> Aprendendo um pouco mais todos os dias.</p>
        </section>

        <section className="contact section" id="contato">
          <p className="section-kicker">Próximo capítulo</p>
          <h2>Boas ideias começam<br />com uma <em>conversa.</em></h2>
          <p className="contact-copy">Estou construindo minha jornada e aberto a conexões, aprendizados e oportunidades.</p>
          <a className="button button-primary button-large" href="mailto:contato@murilodev.com">Diga olá <ArrowIcon /></a>
          <p className="email-hint">Troque o e-mail deste botão pelo seu endereço em <code>App.jsx</code>.</p>
        </section>
      </main>

      <footer>
        <a className="brand" href="#inicio">M<span>.</span></a>
        <p>Projetado e desenvolvido com curiosidade.</p>
        <a href="#inicio">Voltar ao topo ↑</a>
        <span>© {new Date().getFullYear()} Murilo</span>
      </footer>
    </div>
  )
}

export default App
