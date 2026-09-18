import { Link } from 'react-router-dom'
import { Portrait } from '../components/media/Portrait'
import { Arrow } from '../components/ui/Arrow'
import { SectionLabel } from '../components/ui/SectionLabel'
import { skills } from '../data/profile'
import { email, github, linkedin } from '../data/site'

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
          {skills.map(({ name, description, category }, index) => (
            <div className="skill-row" key={name}>
              <span className="row-index">0{index + 1}</span>
              <div>
                <h3>{name}</h3>
                <p>{description}</p>
              </div>
              <span className="skill-tag">{category}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
export default function AboutPage() {
  return (
    <main id="conteudo" tabIndex={-1}>
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
            <Link className="small-link" to="#historia">
              Minha história <span>↓</span>
            </Link>
          </div>
          <figure className="about-portrait">
            <Portrait priority />
            <figcaption>MURILO BASTOS</figcaption>
          </figure>
        </div>
      </section>
      <section className="story-section section" id="historia" tabIndex={-1}>
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
