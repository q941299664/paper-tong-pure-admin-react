import { useRoutes } from 'react-router-dom'

import { rootRoutes } from './routes'

const Router = () => {
  return useRoutes(rootRoutes)
}

export default Router
