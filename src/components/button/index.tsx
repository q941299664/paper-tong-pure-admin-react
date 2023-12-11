import { Button as AntdButton, Space } from 'antd'
import type { ButtonProps as AntdButtonProps } from 'antd'
import { compact } from 'lodash-es'
import { Fragment } from 'react'
import type { ReactNode } from 'react'

import Icon from '@/components/icon'

export type ButtonProps = AntdButtonProps & {
  icon?: string
  iconRight?: boolean
}

const Button = (props: ButtonProps) => {
  const { icon, iconRight, children, ...attrs } = props
  const antdButtonProps = {
    ...attrs
  }
  const spaceWrapper = (children: ReactNode[]) => {
    let space = 0
    const size = attrs.size || 'middle'
    switch (size) {
      case 'small':
        space = 4
        break
      case 'large':
        space = 12
        break
      default:
        space = 8
        break
    }
    if (children.length > 1) {
      return (
        <Space size={space}>
          {children.map((item, index) => {
            return <Fragment key={index}>{item}</Fragment>
          })}
        </Space>
      )
    }
    return children
  }

  const buttonIcon = icon ? <Icon icon={icon} /> : null
  const content = compact([buttonIcon, children])
  if (iconRight) {
    content.reverse()
  }
  return <AntdButton {...antdButtonProps}>{spaceWrapper(content)}</AntdButton>
}

export default Button
