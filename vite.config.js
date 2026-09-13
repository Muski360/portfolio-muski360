import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { readFile } from 'node:fs/promises'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'prerendered-preview',
      configurePreviewServer(server) {
        // Match the static production routes, including a real HTTP 404 locally.
        server.middlewares.use(async (req, res, next) => {
          if (!req.headers.accept?.includes('text/html')) return next()
          const path =
            new URL(req.url, 'http://localhost').pathname.replace(/\/$/, '') ||
            '/'
          if (['/sobre', '/projetos', '/experiencias'].includes(path))
            req.url = `${path}.html`
          else if (path !== '/' && !path.includes('.')) {
            try {
              const html = await readFile(
                new URL('./dist/404.html', import.meta.url),
              )
              res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' })
              return res.end(html)
            } catch {
              return next()
            }
          }
          next()
        })
      },
    },
  ],
})
