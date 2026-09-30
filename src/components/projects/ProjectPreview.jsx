import { useEffect, useId, useRef, useState } from 'react'
import { useLenis } from 'lenis/react'
import { Film } from '../media/Film'
import { Arrow } from '../ui/Arrow'
import { useMotion } from '../../hooks/useMotion'

export function ProjectPreview({ project }) {
  const dialogRef = useRef(null)
  const videoRef = useRef(null)
  const titleId = useId()
  const [open, setOpen] = useState(false)
  const [failed, setFailed] = useState(false)
  const { paused } = useMotion()
  const lenis = useLenis()

  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    lenis?.stop()
    return () => {
      document.body.style.overflow = previous
      lenis?.start()
    }
  }, [open, lenis])

  useEffect(() => {
    if (paused) videoRef.current?.pause()
  }, [paused])

  const openPreview = (event) => {
    if (
      event.button !== 0 || event.metaKey || event.ctrlKey ||
      event.altKey || event.shiftKey || !dialogRef.current?.showModal
    ) return
    event.preventDefault()
    dialogRef.current.showModal()
    setOpen(true)
  }

  return (
    <>
      <div className="project-screen">
        <div className="screen-bar">
          <span aria-hidden="true"><i /><i /><i /></span>
          <span>{project.name}</span>
          <a
            href={project.video || project.poster}
            onClick={openPreview}
            aria-label={`Ampliar prévia de ${project.name}`}
            aria-haspopup="dialog"
          >
            Ampliar <span aria-hidden="true">⤢</span>
          </a>
        </div>
        <Film
          name={project.name}
          src={project.video}
          poster={project.poster}
          alt={project.mediaAlt}
          suspended={open}
        />
      </div>
      <dialog
        className="project-preview-dialog"
        ref={dialogRef}
        aria-labelledby={titleId}
        data-lenis-prevent
        onClick={(event) => {
          if (event.target === event.currentTarget) event.currentTarget.close()
        }}
        onClose={() => {
          videoRef.current?.pause()
          setOpen(false)
        }}
      >
        <div className="preview-surface">
          <div className="preview-heading">
            <h2 id={titleId}>{project.name}</h2>
            <button type="button" autoFocus onClick={() => dialogRef.current.close()}>
              Fechar <span aria-hidden="true">×</span>
            </button>
          </div>
          {project.video && !failed ? (
            <video
              ref={videoRef}
              src={open ? project.video : undefined}
              poster={project.poster}
              controls
              playsInline
              muted
              preload="metadata"
              aria-label={`Demonstração de ${project.name}`}
              onError={() => setFailed(true)}
            />
          ) : <img src={project.poster} alt={project.mediaAlt} width="1280" height="720" />}
          <div className="preview-caption">
            <p>{failed ? 'Vídeo indisponível. A imagem da interface continua disponível.' : project.category}</p>
            <a href={project.repository} target="_blank" rel="noreferrer">
              Ver código <Arrow diagonal />
            </a>
          </div>
        </div>
      </dialog>
    </>
  )
}
