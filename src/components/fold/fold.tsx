import { Space } from 'antd'
import { Children, isValidElement, useRef, useState } from 'react'
import type { ReactElement, ReactNode } from 'react'
import { useClickAway } from 'react-use'

import Icon from '@/components/icon'

import { DisplayName } from './constants'

export interface FoldProps {
  autoFold?: boolean
  onChange?: (isFold: boolean) => void
  children: ReactNode
}

const Fold = (props: FoldProps) => {
  const { autoFold = false, onChange, children } = props

  // const [isFold, toggleFold] = useToggle(true)
  const [isFold, setIsFold] = useState(true)
  const wrapperRef = useRef<HTMLDivElement>(null)

  const childList = Children.toArray(children).filter(child =>
    isValidElement(child)
  ) as ReactElement[]

  const getContentByDisplayName = (displayName: string) => {
    return childList.find(child => {
      const type = child.type
      if (typeof type !== 'string' && 'displayName' in type) {
        return type.displayName === displayName
      }
    })
  }

  const defaultContent = getContentByDisplayName(DisplayName.Default)
  const collapsedContent = getContentByDisplayName(DisplayName.Collapsed)
  const leftContent = getContentByDisplayName(DisplayName.Left)
  const rightContent = getContentByDisplayName(DisplayName.Right)

  useClickAway(wrapperRef, () => {
    if (!autoFold) return
    if (!isFold) {
      onChange && onChange(true)
      setIsFold(true)
    }
  })

  const handleClick = () => {
    setIsFold(prev => {
      onChange && onChange(!prev)
      return !prev
    })
  }

  return (
    <div ref={wrapperRef}>
      <div>{defaultContent}</div>
      {!isFold && !!collapsedContent && <div>{collapsedContent}</div>}
      <div className="flex items-center justify-between">
        {!!leftContent && <div>{leftContent}</div>}
        {!!collapsedContent && (
          <div
            className="flex items-center justify-center mr-4 font-medium tracking-widest rounded cursor-pointer select-none hover:text-blue-600 grow"
            onClick={handleClick}
          >
            {isFold ? (
              <Space>
                <Icon icon="icon-park-outline:down" />
                <span>展开</span>
              </Space>
            ) : (
              <Space>
                <Icon icon="icon-park-outline:up" />
                <span>折叠</span>
              </Space>
            )}
          </div>
        )}
        {!!rightContent && <div>{rightContent}</div>}
      </div>
    </div>
  )
}

export default Fold
