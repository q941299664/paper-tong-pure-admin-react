import { flattenTree } from '../utils/array'

interface RouteMetaConfig {
  name: string
  path: string
  meta: Record<string, any>
  children?: RouteMetaConfig[]
}

const routeMetaConfig: RouteMetaConfig[] = [
  { name: '登录', path: '/login', meta: { public: true } },
]

const flatMetaRoutes = flattenTree<RouteMetaConfig>(routeMetaConfig)

export function getRouteMeta(path: string) {
  const routeItem = flatMetaRoutes.find(item => path === item.path)

  if (routeItem && routeItem.meta) {
    return routeItem.meta
  }
}
