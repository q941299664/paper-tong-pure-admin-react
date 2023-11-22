import { Empty, Input, Modal } from 'antd'
import type { InputRef } from 'antd'
import classnames from 'classnames'
import 'overlayscrollbars/overlayscrollbars.css'
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react'
import { useRef, useState } from 'react'
import type { ChangeEvent, KeyboardEvent } from 'react'

import Icon from '@/components/icon'
import { authRoutes } from '@/router/routes'
import type { Route } from '@/types/router'
import { flattenRoute, scrollbarOptions } from '@/utils'

export interface SearchContentProps {
  open: boolean
  setFalse: () => void
}

export default function SearchContent(props: SearchContentProps) {
  const { open, setFalse } = props

  const inputRef = useRef<InputRef>(null)
  const [keyword, setKeyword] = useState('')
  const [menuListFilter, setMenuListFilter] = useState<Route[]>([])
  const flatRoutes = flattenRoute(authRoutes)
  const classNamesForSearchResultItem = classnames(
    'block',
    'px-2 py-1',
    'rounded',
    'cursor-pointer select-none',
    'focus:bg-indigo-500 focus:text-white focus:outline-none focus:ring-2 focus:ring-indigo-200'
  )

  const handleOpenChange = (open: boolean) => {
    if (open) {
      inputRef.current!.focus({
        cursor: 'start'
      })
    }
  }

  const handleInputKeydown = (e: KeyboardEvent<HTMLInputElement>) => {
    // 回车或者下
    if (e.key === 'Enter' || e.key === 'ArrowDown') {
      e.preventDefault()
      // if (menuListFilter.value.length) {
      //   focusIndex.value = 0
      // }
    }
  }

  const handleKeywordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value)
    if (e.target.value) {
      const filter = flatRoutes.filter(item => {
        return item?.meta?.title?.toLowerCase().includes(e.target.value)
      })
      setMenuListFilter(filter)
    } else {
      setMenuListFilter([])
    }
  }

  return (
    <Modal
      style={{ top: 10 }}
      open={open}
      title="搜索系统功能"
      footer={null}
      afterOpenChange={handleOpenChange}
      onCancel={setFalse}
    >
      <div className="space-y-4">
        <Input
          ref={inputRef}
          value={keyword}
          placeholder="关键字"
          onKeyDown={handleInputKeydown}
          onChange={handleKeywordChange}
        />
        <div>
          按
          <span className="px-1 py-[2px] mx-1 text-xs text-white bg-gray-500 border border-gray-600 rounded-sm">
            <Icon icon="icon-park-outline:enter-key-one" />
          </span>
          /
          <span className="px-1 py-[2px] mx-1 text-xs text-white bg-gray-500 border border-gray-600 rounded-sm">
            <Icon icon="icon-park-outline:arrow-down" />
          </span>
          开始选择，
          <span className="px-1 py-[2px] mx-1 text-xs text-white bg-gray-500 border border-gray-600 rounded-sm mr-1">
            <Icon icon="icon-park-outline:arrow-up" />
          </span>
          /
          <span className="px-1 py-[2px] mx-1 text-xs text-white bg-gray-500 border border-gray-600 rounded-sm">
            <Icon icon="icon-park-outline:arrow-down" />
          </span>
          控制，
          <span className="px-1 py-[2px] mx-1 text-xs text-white bg-gray-500 border border-gray-600 rounded-sm">
            <Icon icon="icon-park-outline:enter-key-one" />
          </span>
          确认，
          <span className="px-1 py-[2px] mx-1 text-xs text-white bg-gray-500 border border-gray-600 rounded-sm">
            ESC
          </span>
          关闭
        </div>
        {keyword ? (
          menuListFilter.length > 0 ? (
            <OverlayScrollbarsComponent options={scrollbarOptions} defer className="h-64 rounded">
              <section className="p-2 bg-gray-50">
                {menuListFilter.map(item => {
                  return (
                    <button key={item.path} className={classNamesForSearchResultItem}>
                      <div className="text-sm">{item?.meta?.title}</div>
                    </button>
                  )
                })}
              </section>
            </OverlayScrollbarsComponent>
          ) : (
            <section className="p-2 rounded bg-gray-50">
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            </section>
          )
        ) : null}
      </div>
    </Modal>
  )
}
