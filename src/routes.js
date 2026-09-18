// Shared by client navigation, prerendering and the local production preview.
export const routes = [
  {
    id: 'home',
    path: '/',
    title: 'Início',
    description:
      'Portfólio de Murilo Bastos, desenvolvedor Full Stack em formação com foco em React, Spring Boot e inteligência artificial.',
  },
  {
    id: 'about',
    path: '/sobre',
    title: 'Sobre',
    description:
      'Conheça Murilo Bastos, sua trajetória no desenvolvimento de software, interesses e canais de contato.',
  },
  {
    id: 'projects',
    path: '/projetos',
    title: 'Projetos',
    description:
      'Projetos e experimentos de Murilo Bastos em desenvolvimento web, APIs, inteligência artificial e mobile.',
  },
  {
    id: 'experience',
    path: '/experiencias',
    title: 'Experiências',
    description:
      'Formação, prática em projetos e certificações de Murilo Bastos.',
  },
]

export const notFoundRoute = {
  id: 'not-found',
  path: '*',
  title: 'Página não encontrada',
  description: 'A página solicitada não existe.',
  noindex: true,
}

export const navigation = routes.filter((route) => route.path !== '/')

export function getRoute(pathname) {
  const path = pathname.replace(/\/+$/, '') || '/'
  return routes.find((route) => route.path === path) || notFoundRoute
}

export function pageTitle(route) {
  return `${route.title} | Murilo Bastos — MUSKI360`
}

export function routeFile(route) {
  if (route.noindex) return '404.html'
  return route.path === '/' ? 'index.html' : `${route.path.slice(1)}.html`
}
