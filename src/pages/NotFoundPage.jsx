import { TextLink } from '../components/ui/TextLink'

export default function NotFoundPage() {
  return (
    <main id="conteudo" tabIndex={-1}>
      <section className="not-found section">
        <div className="not-found-composition" aria-hidden="true">
          <span className="error-digit">4</span>
          <img
            src="/media/disk-original.webp"
            alt=""
            width="1280"
            height="1280"
            fetchPriority="high"
          />
          <span className="error-digit">4</span>
        </div>
        <div className="not-found-bottom">
          <div>
            <h1>
              <span className="sr-only">404 — </span>Página não encontrada.
            </h1>
            <p>Confira o endereço ou volte ao início.</p>
          </div>
          <TextLink to="/">Voltar ao início</TextLink>
        </div>
      </section>
    </main>
  )
}
