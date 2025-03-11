import { useEffect } from 'react'
import { useLocation, useNavigate, useRoutes } from 'react-router-dom'
import routes from '~react-pages'

import { getRouteMeta } from './routeMeta'

export default function Router() {
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const meta = getRouteMeta(location.pathname)
    console.log('route')
    console.log(meta)
    console.log('route')
  }, [location, navigate])

  return useRoutes(routes)
}
