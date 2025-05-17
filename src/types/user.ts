import type { BasePageParams } from '@/types/base'
import type { MenuTree } from '@/types/menu'

import type { BaseEntity } from '.'

export interface LoginInfo {
  username: string
  password: string
}

export interface AuthTokens {
  accessToken: string
  refreshToken: string
}

export interface UserInfo extends BaseEntity {
  username: string
  nickName: string
  headPic: string
  menus: MenuTree
  menuPermissions: string[]
  featurePermissions: string[]
}

export interface User extends BaseEntity {
  username: string | null
  password?: string | null
  nickName?: string | null
  email?: string | null
  phone?: string | null
  headPic?: string | null
  isFrozen: boolean
  roles?: string[]
}

export interface UserListParams extends BasePageParams {
  username?: string | null
  nickName?: string | null
  email?: string | null
  phone?: string | null
}

export interface UserList {
  total: number
  list: User[]
}
