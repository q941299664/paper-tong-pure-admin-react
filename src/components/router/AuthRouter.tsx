import type { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

import { rootRoutes } from '@/router/routes'
import { useTokenStore } from '@/stores'
import { searchRoute } from '@/utils/route'

const AuthRouter = ({ children }: { children: ReactNode }) => {
  const { pathname } = useLocation()
  const token = useTokenStore(state => state.token)

  const route = searchRoute(pathname, rootRoutes)

  if (route.meta?.auth === false) return children

  if (!token || !token.accessToken) return <Navigate to="/login" replace={true} />

  return children
}

export default AuthRouter
