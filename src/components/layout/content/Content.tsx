import type { ReactNode } from 'react'

import { Layout } from 'antd'
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react'
import { useMemo } from 'react'
import { useShallow } from 'zustand/react/shallow'

import { useAppStore } from '@/stores'
import { scrollbarOptions } from '@/utils/overlayscrollbars'

const { Content: AntdContent } = Layout

interface ScrollableContentProps {
  children?: ReactNode
}

export default function Content({ children }: ScrollableContentProps) {
  const { headerHeight } = useAppStore(
    useShallow(state => ({
      headerHeight: state.headerHeight,
    })),
  )

  const contentStyle = useMemo(() => ({
    height: `calc(100vh - ${headerHeight}px)`,
  }), [headerHeight])

  return (
    <AntdContent
      style={contentStyle}
      className="bg-theme-content dark:bg-theme-content-dark"
    >
      <OverlayScrollbarsComponent
        options={scrollbarOptions}
        defer
        className="h-full bg-theme-content dark:bg-theme-content-dark"
      >
        {children}
      </OverlayScrollbarsComponent>
    </AntdContent>
  )
}
