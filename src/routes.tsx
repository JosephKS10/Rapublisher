import { Layout } from './components/Layout'
import About from './pages/About'
import Contact from './pages/Contact'
import Home from './pages/Home'
import HowWeWork from './pages/HowWeWork'
import { IndustriesIndex, IndustryPage } from './pages/Industries'
import Insights, { Article } from './pages/Insights'
import { Accessibility, Privacy, Terms } from './pages/Legal'
import NotFound from './pages/NotFound'
import Pricing from './pages/Pricing'
import { ServicePage, ServicesIndex } from './pages/Services'
import { CaseStudy, WorkIndex } from './pages/Work'

// Routes from A6.
export const routes = [
  {
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/how-we-work', element: <HowWeWork /> },
      { path: '/services', element: <ServicesIndex /> },
      { path: '/services/:slug', element: <ServicePage /> },
      { path: '/industries', element: <IndustriesIndex /> },
      { path: '/industries/:slug', element: <IndustryPage /> },
      { path: '/work', element: <WorkIndex /> },
      { path: '/work/:slug', element: <CaseStudy /> },
      { path: '/about', element: <About /> },
      { path: '/pricing', element: <Pricing /> },
      { path: '/insights', element: <Insights /> },
      { path: '/insights/:slug', element: <Article /> },
      { path: '/contact', element: <Contact /> },
      { path: '/privacy', element: <Privacy /> },
      { path: '/terms', element: <Terms /> },
      { path: '/accessibility', element: <Accessibility /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]
