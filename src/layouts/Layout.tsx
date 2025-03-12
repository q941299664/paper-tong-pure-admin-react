import { Outlet, useLocation } from 'react-router-dom'

import { AuthGuard } from '@/components/auth-guard'
import { BlankLayout, DefaultLayout } from '@/layouts'
import { getRouteMeta } from '@/router/routeMeta'

export default function Layout() {
  const { pathname } = useLocation()
  const routeMeta = getRouteMeta(pathname)

  const CurrentLayout = routeMeta?.layout === 'blank' ? BlankLayout : DefaultLayout

  return (
    <AuthGuard>
      <CurrentLayout>
        <Outlet />
      </CurrentLayout>
    </AuthGuard>
  )
}
