import { Menu } from 'antd'
import type { MenuProps } from 'antd'
import { useEffect, useState } from 'react'
import type { CSSProperties } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { authRoutes } from '@/router/routes'
import { getOpenKeys } from '@/utils'

import { SIDEBAR_WIDTH } from './constants'

function Sidebar() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const [openKeys, setOpenKeys] = useState<string[]>(getOpenKeys(pathname))

  const sideBarStyle: CSSProperties = {
    width: SIDEBAR_WIDTH
  }

  useEffect(() => {
    setOpenKeys(getOpenKeys(pathname))
  }, [pathname])

  const items: MenuProps['items'] = authRoutes.map((route, i) => {
    const key = route.path || String(i)

    return {
      key,
      icon: route.meta?.icon,
      label: route.meta?.title,
      children: route.children?.map(child => {
        return {
          key: child.path,
          label: child.meta?.title
        }
      })
    }
  })

  const onClick: MenuProps['onClick'] = ({ key }) => {
    navigate(key)
  }

  const onOpenChange: MenuProps['onOpenChange'] = keys => {
    setOpenKeys(keys)
  }

  return (
    <div
      style={sideBarStyle}
      className="fixed inset-y-0 z-10 flex flex-col bg-white border-r border-gray-200 shadow-md cursor-pointer select-none"
    >
      <Menu
        mode="inline"
        items={items}
        selectedKeys={[pathname]}
        openKeys={openKeys}
        onClick={onClick}
        onOpenChange={onOpenChange}
      ></Menu>
    </div>
  )
}

export default Sidebar
