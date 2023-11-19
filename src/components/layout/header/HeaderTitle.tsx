import { LeftOutlined } from '@ant-design/icons'
import { useLocation } from 'react-router-dom'

import { authRoutes } from '@/router/routes'
import { searchRoute } from '@/utils'

function HeaderTitle() {
  const { pathname } = useLocation()
  const isHomePage = ['home', 'dashboard-home'].includes(pathname)
  const canBack = !/.+\/list$/.test(pathname)
  const currentRoute = searchRoute(pathname, authRoutes)
  return (
    !isHomePage && (
      <div className="h-[32px] flex justify-center items-center">
        {canBack ? (
          <span className="self-stretch w-[32px] text-xl rounded select-none cursor-pointer hover:bg-gray-100 hover:text-gray-900 flex items-center justify-center">
            <LeftOutlined />
          </span>
        ) : (
          <span className="self-stretch w-[32px] text-xl rounded select-none cursor-pointer flex items-center justify-center">
            {currentRoute.meta?.icon}
          </span>
        )}
        {!!currentRoute.meta?.title && (
          <span className="ml-2 text-lg font-medium">{currentRoute.meta?.title}</span>
        )}
      </div>
    )
  )
}

export default HeaderTitle
