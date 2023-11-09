import { Layout, Menu } from 'antd'
import type { MenuProps } from 'antd'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { authRoutes } from '@/router/routes'
import { getOpenKeys } from '@/utils'

const { Sider } = Layout

function SideBar() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const [openKeys, setOpenKeys] = useState<string[]>(getOpenKeys(pathname))

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
    <Sider>
      <Menu
        mode="inline"
        items={items}
        selectedKeys={[pathname]}
        openKeys={openKeys}
        style={{ height: '100%' }}
        onClick={onClick}
        onOpenChange={onOpenChange}
      ></Menu>
    </Sider>
  )
}

export default SideBar
