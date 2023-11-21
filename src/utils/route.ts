import { resolvePath } from 'react-router-dom'

import type { Route } from '@/types/router'

export function searchRoute(pathname: string, routes: Route[]): Route {
  let result: Route = {}
  for (const route of routes) {
    if (route.path === pathname) return route

    if (route.children) {
      const res = searchRoute(pathname, route.children)
      if (Object.keys(res).length > 0) result = res
    }
  }

  return result
}

export function normalizeRoute(routes: Route[], isSort = true): Route[] {
  const result: Route[] = []

  for (const route of routes) {
    if (route.children) {
      route.children.forEach(child => {
        child.path = resolvePath(child.path!, route.path).pathname
      })
      result.push({
        ...route,
        children: normalizeRoute(route.children, false)
      })
    } else {
      result.push(route)
    }
  }
  if (isSort) {
    result.sort((a, b) => {
      return (a.meta?.index || 0) - (b.meta?.index || 0)
    })
  }

  return result
}

export function getOpenKeys(path: string): string[] {
  let i = 1
  const arr: string[] = []
  for (;;) {
    i = path.indexOf('/', i)
    if (i === -1) break
    arr.push(path.slice(0, i))
    i = i + 1
  }
  return arr
}
