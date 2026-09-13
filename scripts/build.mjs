import { build, createServer } from 'vite'
import { createElement, StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { readFile, writeFile } from 'node:fs/promises'

// Generate the existing routes from the same React tree used in the browser.
// Content, links and posters stay useful when JavaScript is delayed or fails.
await build()
const server = await createServer({
  server: { middlewareMode: true, hmr: false },
  appType: 'custom',
})
try {
  const { default: App } = await server.ssrLoadModule('/src/App.jsx')
  const template = await readFile('dist/index.html', 'utf8')
  const pages = [
    [
      '/',
      'index',
      'Início',
      'Portfólio de Murilo Bastos, desenvolvedor Full Stack em formação com foco em React, Spring Boot e inteligência artificial.',
    ],
    [
      '/sobre',
      'sobre',
      'Sobre',
      'Conheça Murilo Bastos, sua trajetória no desenvolvimento de software, interesses e canais de contato.',
    ],
    [
      '/projetos',
      'projetos',
      'Projetos',
      'Projetos e experimentos de Murilo Bastos em desenvolvimento web, APIs, inteligência artificial e mobile.',
    ],
    [
      '/experiencias',
      'experiencias',
      'Experiências',
      'Formação, prática em projetos e certificações de Murilo Bastos.',
    ],
    ['/404', '404', 'Página não encontrada', 'A página solicitada não existe.'],
  ]
  for (const [route, file, title, description] of pages) {
    const markup = renderToString(
      createElement(
        StrictMode,
        null,
        createElement(App, { serverLocation: route }),
      ),
    )
    const html = template
      .replace('<div id="root"></div>', `<div id="root">${markup}</div>`)
      .replace(
        /<title>.*?<\/title>/,
        `<title>${title} | Murilo Bastos — MUSKI360</title>`,
      )
      .replace(
        /<meta name="description" content="[^"]*"\s*\/>/,
        `<meta name="description" content="${description}" />`,
      )
      .replace(
        '</head>',
        `${file === '404' ? '<meta name="robots" content="noindex" />' : `<link rel="canonical" href="https://muski360.dev${route === '/' ? '/' : route}" />`}\n</head>`,
      )
    await writeFile(`dist/${file}.html`, html)
  }
  console.log('Prerendered 4 routes and the 404 page.')
} finally {
  await server.close()
}
