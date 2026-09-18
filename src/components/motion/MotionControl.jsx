import { useMotion } from '../../hooks/useMotion'

export function MotionControl() {
  const { paused, reduced, toggle } = useMotion()
  const label = reduced
    ? 'Movimento reduzido pelo sistema'
    : paused
      ? 'Ativar movimento'
      : 'Pausar movimento'

  return (
    <button
      className="motion-control"
      type="button"
      onClick={toggle}
      disabled={reduced}
      aria-label={label}
      aria-pressed={paused}
      title={label}
    >
      <svg viewBox="0 0 20 20" aria-hidden="true">
        <path d={paused ? 'm7 4 9 6-9 6Z' : 'M6 4v12M13 4v12'} />
      </svg>
    </button>
  )
}
