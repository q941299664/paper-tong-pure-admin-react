import type { ReactNode } from 'react'

import { useMemo } from 'react'

import type { MatchMode } from '@/hooks/usePermission'

import { MENU_TYPE } from '@/constants/menu'
import { usePermission } from '@/hooks/usePermission'

interface PermissionProps {
  permission: string | string[]
  matchMode?: MatchMode
  children: ReactNode
}

export default function Permission({
  permission,
  matchMode = 'all',
  children,
}: PermissionProps) {
  const { hasPermission } = usePermission()

  const isAuthorized = useMemo(() => {
    return hasPermission({
      permission,
      permissionType: MENU_TYPE.FEATURE,
      matchMode,
    })
  }, [permission, matchMode, hasPermission])

  if (!isAuthorized) {
    return null
  }

  return <>{children}</>
}
