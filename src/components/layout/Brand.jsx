import { Link } from 'react-router-dom'

function DiskMark() {
  return (
    <svg className="disk-mark" viewBox="0 0 32 32" aria-hidden="true">
      <path fill="currentColor" d="M2 2h24l4 4v24H2z" />
      <path fill="var(--paper)" d="M8 2h15v11H8zM7 18h18v10H7z" />
      <path fill="currentColor" d="M17 4h4v7h-4z" />
    </svg>
  )
}

export function Brand() {
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
