import { Navigate } from 'react-router-dom'

import NotFound from '@/pages/NotFound.tsx'
import Login from '@/pages/user/login/Login.tsx'
import type { RouteObject } from '@/types/router'
import { normalizeRoute } from '@/utils'

const dynamicRoutes: RouteObject[] = []

const authRouteModules: Record<
  string,
  {
    [key: string]: RouteObject[]
  }
> = import.meta.glob('./dynamic/*.tsx', { eager: true })

Object.keys(authRouteModules).forEach(item => {
  const module = authRouteModules[item].default.map(route => {
    route.meta!.auth = true
    route.meta!.index = route.meta?.index || -1

    return route
  })
  dynamicRoutes.push(...module)
})

export const authRoutes = normalizeRoute(dynamicRoutes)

export const rootRoutes = [
  {
    path: '/',
    element: <Navigate to="/dashboard" replace={true} />
  },
  {
    path: '/login',
    element: <Login />,
    meta: {
      title: 'Login',
      key: 'login',
      auth: false
    }
  },
  ...authRoutes,
  {
    path: '/404',
    element: <NotFound />,
    meta: {
      title: 'Not Found',
      key: 'notfound',
      auth: false
    }
  },
  {
    path: '*',
    element: <Navigate to="/404" replace={true} />
  }
]
