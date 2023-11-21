import type { ReactNode } from 'react'

export interface MetaObject {
  auth?: boolean
  title?: string
  key?: string
  icon?: string
  index?: number
}

export interface RouteObject {
  element?: ReactNode
  path?: string
  meta?: MetaObject
  children?: RouteObject[]
}
