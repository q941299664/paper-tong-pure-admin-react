import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import type { UserInfo } from '@/types/user'

import { getUserInfoApi } from '@/apis/user'
import { flattenTree } from '@/utils/array'
import { projectSign } from '@/utils/string'

interface UserState {
  // 认证相关
  accessToken: string | null
  refreshToken: string | null
  isLogin: boolean
  setAllToken: (accessToken: string, refreshToken: string) => void
  clearAllToken: () => void

  // 用户信息相关
  userInfo: UserInfo | null
  userMenus: any[]
  flatUserMenus: any[]
  menuPermissions: string[]
  featurePermissions: string[]

  // 路由相关
  matchedMenuPath: (pathname: string, matched: any[]) => string | null

  // 操作方法
  fetchUserInfo: () => Promise<void>
  clearUserInfo: () => void
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      // 认证相关
      accessToken: null,
      refreshToken: null,
      isLogin: false,

      setAllToken: (accessToken: string, refreshToken: string) =>
        set({
          accessToken,
          refreshToken,
          isLogin: true,
        }),

      clearAllToken: () =>
        set({
          accessToken: null,
          refreshToken: null,
          isLogin: false,
        }),

      // 用户信息相关
      userInfo: null,

      // 派生状态（替代Vue的computed）
      get userMenus() {
        return get().userInfo?.menus || []
      },

      get flatUserMenus() {
        return flattenTree(get().userMenus || [])
      },

      get menuPermissions() {
        return get().userInfo?.menuPermissions || []
      },

      get featurePermissions() {
        return get().userInfo?.featurePermissions || []
      },

      // 路由相关方法
      matchedMenuPath: (pathname: string, matched: any[]) => {
        const flatMenus = get().flatUserMenus

        // 获取当前路由的所有可能父路径
        const possiblePaths = matched.map(item => item.pathname || item.path)

        // 找到最匹配的菜单路径
        const matchedPath = [...possiblePaths]
          .reverse()
          .find(path => flatMenus.some(menu => menu.path === path))

        if (!matchedPath)
          return null

        if (matchedPath === '/' && pathname !== '/') {
          return null
        }

        return matchedPath
      },

      // API操作方法
      fetchUserInfo: async () => {
        try {
          const userInfoRes = await getUserInfoApi()
          set({ userInfo: userInfoRes })
          // return userInfoRes
        }
        catch (error) {
          console.error('获取用户信息失败:', error)
          throw error
        }
      },

      clearUserInfo: () => set({ userInfo: null }),
    }),
    {
      name: projectSign('user-storage'),
      partialize: state => ({
        // 只持久化这些字段
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
      }),
    },
  ),
)
