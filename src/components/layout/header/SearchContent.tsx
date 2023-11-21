import { Empty, Input, Modal } from 'antd'
import type { InputRef } from 'antd'
import classnames from 'classnames'
import { last, toPairs } from 'lodash-es'
import { useRef } from 'react'
import type { KeyboardEvent } from 'react'

import Icon from '@/components/icon'

export interface SearchContentProps {
  open: boolean
  setFalse: () => void
}

export default function SearchContent(props: SearchContentProps) {
  const { open, setFalse } = props

  const inputRef = useRef<InputRef>(null)

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
        <Input ref={inputRef} placeholder="关键字" onKeyDown={handleInputKeydown} />
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
      </div>
    </Modal>
  )
}
