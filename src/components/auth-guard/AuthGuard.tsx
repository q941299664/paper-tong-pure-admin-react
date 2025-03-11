import type { FC, ReactNode } from 'react'

import { useEffect } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

import { useUserStore } from '@/stores/userStore'

interface AuthGuardProps {
  children: ReactNode
  requiredPermission?: string
}

export default function AuthGuard({
  children,
  requiredPermission,
}: AuthGuardProps) {
  const { isLogin, fetchUserInfo, userInfo, menuPermissions } = useUserStore()
  const location = useLocation()

  useEffect(() => {
    // 如果已登录但没有用户信息，获取用户信息
    if (isLogin && !userInfo) {
      fetchUserInfo().catch(console.error)
    }
  }, [isLogin, userInfo, fetchUserInfo])

  // 未登录时重定向到登录页
  if (!isLogin) {
    return <Navigate to={`/login?redirect=${encodeURIComponent(location.pathname)}`} replace />
  }

  // 等待用户信息加载
  if (isLogin && !userInfo) {
    return <div>Loading...</div>
  }

  // 检查权限
  if (requiredPermission && !menuPermissions.includes(requiredPermission)) {
    return <Navigate to="/403" replace />
  }

  return <>{children}</>
}
