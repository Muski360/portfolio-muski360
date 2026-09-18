export function Portrait({ className = '', priority = false }) {
  return (
    <img
      className={`portrait ${className}`}
      src="/media/murilo-960.webp"
      srcSet="/media/murilo-480.webp 480w, /media/murilo-960.webp 960w"
      sizes="(max-width: 700px) 90vw, 45vw"
      alt="Murilo Bastos"
      width="1122"
      height="1402"
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
    />
  )
}
