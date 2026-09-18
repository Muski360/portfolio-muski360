import { BrowserRouter, StaticRouter, Route, Routes } from 'react-router-dom'
import { SiteLayout } from './components/layout/SiteLayout'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ProjectsPage from './pages/ProjectsPage'
import ExperiencePage from './pages/ExperiencePage'
import NotFoundPage from './pages/NotFoundPage'
import { routes, notFoundRoute } from './routes'

const pages = {
  home: HomePage,
  about: AboutPage,
  projects: ProjectsPage,
  experience: ExperiencePage,
}

export default function App({ serverLocation }) {
  const Router = serverLocation ? StaticRouter : BrowserRouter
  return (
    <Router location={serverLocation}>
      <Routes>
        <Route element={<SiteLayout />}>
          {routes.map(({ id, path }) => {
            const Page = pages[id]
            return (
              <Route key={id} path={path} caseSensitive element={<Page />} />
            )
          })}
          <Route path={notFoundRoute.path} element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  )
}
