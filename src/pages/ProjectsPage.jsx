import { ProjectCase } from '../components/projects/ProjectCase'
import { Arrow } from '../components/ui/Arrow'
import { TextLink } from '../components/ui/TextLink'
import { experiments, projects } from '../data/projects'
import { github } from '../data/site'

export default function ProjectsPage() {
  return (
    <main id="conteudo" tabIndex={-1}>
      <section className="work-hero section">
        <div className="work-hero-title">
          <h1>PROJETOS.</h1>
          <Link
            className="work-jump"
            to="#projetos"
            aria-label="Explorar projetos"
          >
            <Arrow />
          </Link>
        </div>
        <div className="work-hero-bottom">
          <p>
            Projetos pessoais e acadêmicos onde testo tecnologias, resolvo
            problemas e construo aplicações de ponta a ponta.
          </p>
        </div>
      </section>
      <div className="project-collection" id="projetos" tabIndex={-1}>
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
                  {item.projects.map((project) => (
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
import { Link } from 'react-router-dom'
