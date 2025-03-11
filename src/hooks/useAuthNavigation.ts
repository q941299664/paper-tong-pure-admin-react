import { useLocation, useNavigate } from 'react-router-dom'
import { useShallow } from 'zustand/react/shallow'

import type { LoginInfo } from '@/types/user'

import { loginApi } from '@/apis/user'
import { useUserStore } from '@/stores'

export function useAuthNavigation() {
  const navigate = useNavigate()
  const location = useLocation()
  const {
    setAllToken,
    clearAllToken,
    fetchUserInfo,
    clearUserInfo,
    isLogin,
  } = useUserStore(
    useShallow(state => ({
      setAllToken: state.setAllToken,
      clearAllToken: state.clearAllToken,
      fetchUserInfo: state.fetchUserInfo,
      clearUserInfo: state.clearUserInfo,
      isLogin: state.isLogin,
    })),
  )

  async function login(data: LoginInfo, redirectPath?: string) {
    try {
      // 调用登录API
      const loginRes = await loginApi(data)

      // 设置令牌
      setAllToken(loginRes.accessToken, loginRes.refreshToken)

      // 获取用户信息
      await fetchUserInfo()

      // 登录成功后导航
      const targetPath = redirectPath || '/'
      navigate(targetPath)

      return loginRes
    }
    catch (error) {
      console.error('登录失败:', error)
      throw error
    }
  }

  function logout(returnPath?: string) {
    // 获取当前路径作为默认返回路径
    const currentPath = returnPath || location.pathname

    // 清除认证信息
    clearAllToken()

    // 清除用户信息
    clearUserInfo()

    // 导航到登录页，携带returnUrl参数
    navigate(`/login?returnUrl=${encodeURIComponent(currentPath)}`)
  }

  function requireAuth(callback: () => void) {
    if (!isLogin) {
      navigate(`/login?returnUrl=${encodeURIComponent(location.pathname)}`)
    }
    else {
      callback()
    }
  }

  return {
    login,
    logout,
    requireAuth,
    isAuthenticated: isLogin,
  }
}
