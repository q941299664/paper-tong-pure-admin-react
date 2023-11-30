import { Empty, Input, Modal } from 'antd'
import type { InputRef } from 'antd'
import classnames from 'classnames'
import 'overlayscrollbars/overlayscrollbars.css'
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react'
import { useEffect, useRef, useState } from 'react'
import type { ChangeEvent, KeyboardEvent } from 'react'
import { useNavigate } from 'react-router-dom'

import Icon from '@/components/icon'
import useHotkey from '@/hooks/useHotkey'
import { authRoutes } from '@/router/routes'
import type { Route } from '@/types/router'
import { flattenRoute, scrollbarOptions } from '@/utils'

export interface SearchContentProps {
  open: boolean
  setClose: () => void
}

function SearchContent(props: SearchContentProps) {
  const { open, setClose } = props
  const navigate = useNavigate()
  const inputRef = useRef<InputRef>(null)
  const buttonRefs = useRef<HTMLButtonElement[]>([])
  const [focusIndex, setFocusIndex] = useState(-1)
  const [keyword, setKeyword] = useState('')
  const [menuListFilter, setMenuListFilter] = useState<Route[]>([])
  const flatRoutes = flattenRoute(authRoutes)

  useEffect(() => {
    if (focusIndex > -1) {
      buttonRefs.current[focusIndex].focus()
    }
  }, [focusIndex])

  useHotkey({
    hotkey: 'down',
    callback: () => {
      if (buttonRefs.current.length > 0) {
        setFocusIndex(prev => {
          if (prev < buttonRefs.current.length - 1) {
            return prev + 1
          }
          return 0
        })
      }
    }
  })

  useHotkey({
    hotkey: 'up',
    callback: () => {
      if (buttonRefs.current.length > 0) {
        setFocusIndex(prev => {
          if (prev > 0) {
            return prev - 1
          }
          return buttonRefs.current.length - 1
        })
      }
    }
  })

  useHotkey({
    hotkey: 'enter',
    callback: () => {
      if (buttonRefs.current.length > 0) {
        buttonRefs.current[focusIndex].click()
      }
    }
  })

  const classNamesForSearchResultItem = classnames(
    'block',
    'px-2 py-1',
    'rounded',
    'cursor-pointer select-none',
    'focus:bg-indigo-500 focus:text-white focus:outline-none focus:ring-2 focus:ring-indigo-200'
  )

  const resetFocusIndex = () => {
    setFocusIndex(-1)
  }

  const resetAll = () => {
    setKeyword('')
    setMenuListFilter([])
    resetFocusIndex()
    setClose()
  }

  const selectRoute = (route: Route) => {
    navigate(route.path!)
    resetAll()
  }

  const handleOpenChange = (open: boolean) => {
    if (open) {
      inputRef.current!.focus()
    }
  }

  const handleInputKeydown = (e: KeyboardEvent<HTMLInputElement>) => {
    // 回车或者下
    if (e.key === 'Enter' || e.key === 'ArrowDown') {
      e.preventDefault()
      inputRef.current!.blur()
      if (menuListFilter.length) {
        setFocusIndex(0)
      }
    }
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
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

  const handleInputFocus = () => {
    resetFocusIndex()
  }

  return (
    <Modal
      style={{ top: 10 }}
      open={open}
      title="搜索系统功能"
      footer={null}
      afterOpenChange={handleOpenChange}
      onCancel={setClose}
    >
      <div className="space-y-4">
        <Input
          ref={inputRef}
          value={keyword}
          placeholder="关键字"
          onKeyDown={handleInputKeydown}
          onFocus={handleInputFocus}
          onChange={handleInputChange}
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
                {menuListFilter.map((item, itemIndex) => {
                  return (
                    <button
                      key={item.path}
                      ref={node => (buttonRefs.current[itemIndex] = node!)}
                      className={classNamesForSearchResultItem}
                      onClick={() => selectRoute(item)}
                    >
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

export default SearchContent
