import { TextLink } from '../ui/TextLink'
import { ProjectPreview } from './ProjectPreview'

export function ProjectCase({ project, index }) {
  return (
    <section
      className="project-case"
      id={project.id}
      style={{ '--project-color': project.color || '#deded4' }}
    >
      <div className="section project-heading">
        <div className="project-title-row">
          <h2 data-reveal="title">{project.name}</h2>
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
        <ProjectPreview project={project} />
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
          <h3 data-reveal="title">
            {project.detailTitle[0]}
            <br />
            <span className="serif-word">{project.detailTitle[1]}</span>
          </h3>
          <p>{project.detailText}</p>
        </div>
        <ol className="feature-list">
          {project.features.map(([title, description], i) => (
            <li key={title} data-reveal>
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
