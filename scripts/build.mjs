import { build, createServer } from 'vite'
import { createElement, StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { readFile, writeFile } from 'node:fs/promises'
import { routes, notFoundRoute, pageTitle, routeFile } from '../src/routes.js'
import { siteOrigin } from '../src/data/site.js'

const escapeHtml = (value) =>
  value.replace(
    /[&<>"']/g,
    (character) =>
      ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
      })[character],
  )

// The same React pages and route metadata serve the browser and static HTML.
// Content, links and posters stay useful when JavaScript is delayed or fails.
await build()
const server = await createServer({
  server: { middlewareMode: true, hmr: false },
  appType: 'custom',
})
try {
  const { default: App } = await server.ssrLoadModule('/src/App.jsx')
  const template = await readFile('dist/index.html', 'utf8')
  for (const route of [...routes, notFoundRoute]) {
    const markup = renderToString(
      createElement(
        StrictMode,
        null,
        createElement(App, {
          serverLocation: route.noindex ? '/404' : route.path,
        }),
      ),
    )
    const indexing = route.noindex
      ? '<meta name="robots" content="noindex" />'
      : `<link rel="canonical" href="${escapeHtml(`${siteOrigin}${route.path}`)}" />`
    const html = template
      .replace('<div id="root"></div>', `<div id="root">${markup}</div>`)
      .replace(
        /<title>.*?<\/title>/,
        `<title>${escapeHtml(pageTitle(route))}</title>`,
      )
      .replace(
        /<meta\s+name="description"\s+content="[^"]*"\s*\/>/,
        `<meta name="description" content="${escapeHtml(route.description)}" />`,
      )
      .replace('</head>', `${indexing}\n</head>`)
    await writeFile(`dist/${routeFile(route)}`, html)
  }
  console.log(`Prerendered ${routes.length} routes and the 404 page.`)
} finally {
  await server.close()
}
