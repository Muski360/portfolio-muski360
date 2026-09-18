export function SectionLabel({ children }) {
  return (
    <div className="section-label">
      <span className="label-dot" />
      <span>{children}</span>
    </div>
  )
}
