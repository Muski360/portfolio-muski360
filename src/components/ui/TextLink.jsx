import { Link } from 'react-router-dom'
import { Arrow } from './Arrow'

export function TextLink({
  to,
  href,
  children,
  external = false,
  className = '',
}) {
  const content = (
    <>
      {children}
      <Arrow diagonal={external} />
    </>
  )
  return to ? (
    <Link className={`text-link ${className}`} to={to}>
      {content}
    </Link>
  ) : (
    <a
      className={`text-link ${className}`}
      href={href}
      {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
    >
      {content}
    </a>
  )
}
