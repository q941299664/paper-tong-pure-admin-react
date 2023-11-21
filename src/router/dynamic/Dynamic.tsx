import LayoutApp from '@/layout/LayoutApp'
import type { Route } from '@/types/router'

const DashboardRoutes: Route[] = [
  {
    path: '/dashboard',
    meta: {
      title: 'Dashboard',
      key: 'dashboard',
      icon: 'icon-park-outline:dashboard',
      index: 1
    },
    element: <LayoutApp />,
    children: [
      {
        path: 'index',
        element: <div>Dashboard</div>,
        meta: {
          title: 'Dashboard',
          icon: 'icon-park-outline:dashboard'
        }
      },
      {
        path: '/dashboard/upload',
        element: <div>Upload</div>,
        meta: {
          title: 'Upload',
          icon: 'icon-park-outline:upload'
        }
      }
    ]
  }
]

export default DashboardRoutes
