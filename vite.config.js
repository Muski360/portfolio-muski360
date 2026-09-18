import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { readFile, stat } from 'node:fs/promises'
import { resolve, sep } from 'node:path'
import { getRoute, routeFile } from './src/routes.js'

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'prerendered-preview',
      configurePreviewServer(server) {
        const outputDirectory = resolve(
          server.config.root,
          server.config.build.outDir,
        )
        // Match the static production routes, including a real HTTP 404 locally.
        server.middlewares.use(async (req, res, next) => {
          if (req.method !== 'GET' && req.method !== 'HEAD') return next()
          const url = new URL(req.url, 'http://localhost')
          let pathname = url.pathname
          try {
            pathname = decodeURIComponent(pathname)
          } catch {
            // Malformed escapes continue to the recoverable 404 below.
          }
          const cleanPath =
            pathname.replace(/\/+$/, '').replace(/\.html$/, '') || '/'
          const route = getRoute(cleanPath === '/index' ? '/' : cleanPath)
          if (!route.noindex) {
            if (url.pathname !== route.path) {
              res.writeHead(307, { Location: `${route.path}${url.search}` })
              return res.end()
            }
            req.url = `/${routeFile(route)}`
            return next()
          }

          if (cleanPath === '/404' && url.pathname !== '/404') {
            res.writeHead(307, { Location: `/404${url.search}` })
            return res.end()
          }

          // Direct navigation to a real public file must still serve that file.
          let requestedFile
          try {
            requestedFile = resolve(outputDirectory, `.${pathname}`)
          } catch {
            // Malformed URL escapes are handled by the same recoverable 404.
          }
          if (requestedFile?.startsWith(`${outputDirectory}${sep}`)) {
            const file = await stat(requestedFile).catch(() => null)
            if (file?.isFile()) return next()
          }

          try {
            const html = await readFile(
              resolve(outputDirectory, routeFile(route)),
            )
            res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' })
            return res.end(req.method === 'HEAD' ? undefined : html)
          } catch {
            return next()
          }
        })
      },
    },
  ],
})
