import { Layout } from 'antd'
import 'overlayscrollbars/overlayscrollbars.css'
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react'
import { useMemo } from 'react'
import { useShallow } from 'zustand/react/shallow'

import { useAppStore } from '@/stores'
import { scrollbarOptions } from '@/utils/overlayscrollbars'

import Logo from './Logo'
import Menu from './Menu'

const { Sider: AntdSider } = Layout

export default function Sider() {
  // 使用应用状态
  const {
    headerHeight,
    sidebarWidth,
    sidebarCollapsedWidth,
    sidebarCollapsed,
    toggleSidebarCollapsed,
  } = useAppStore(useShallow(state => ({
    headerHeight: state.headerHeight,
    sidebarWidth: state.sidebarWidth,
    sidebarCollapsedWidth: state.sidebarCollapsedWidth,
    sidebarCollapsed: state.sidebarCollapsed,
    toggleSidebarCollapsed: state.toggleSidebarCollapsed,
  })))

  // 计算菜单样式
  const menuStyle = useMemo(() => ({
    height: `calc(100vh - ${headerHeight}px)`,
  }), [headerHeight])

  function handleCollapse() {
    toggleSidebarCollapsed()
  }

  return (
    <AntdSider
      collapsed={sidebarCollapsed}
      className="z-1"
      collapsible
      width={sidebarWidth}
      collapsedWidth={sidebarCollapsedWidth}
      trigger={null}
      onCollapse={handleCollapse}
    >
      <div className="h-full select-none border-r border-r-light-200 border-r-solid bg-theme-layout shadow-md dark:border-r-dark-900 dark:bg-[#141414]">
        <Logo />
        <OverlayScrollbarsComponent options={scrollbarOptions} defer style={menuStyle}>
          <Menu />
        </OverlayScrollbarsComponent>
      </div>
    </AntdSider>
  )
}
