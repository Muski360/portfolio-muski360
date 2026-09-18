export function Arrow({ diagonal = false }) {
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
