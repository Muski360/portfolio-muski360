import { Arrow } from '../components/ui/Arrow'
import { SectionLabel } from '../components/ui/SectionLabel'
import { TextLink } from '../components/ui/TextLink'
import { certifications } from '../data/profile'

export default function ExperiencePage() {
  return (
    <main id="conteudo" tabIndex={-1}>
      <section className="experience-hero section">
        <div className="experience-hero-grid">
          <h1>
            EM
            <br />
            <span>FORMAÇÃO.</span>
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
        <div className="timeline-heading">
          <h2>
            <span className="sr-only">Formação: </span>
            2024 <span className="timeline-year-rule" aria-hidden="true" />
            <span className="sr-only">a </span>2026
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
