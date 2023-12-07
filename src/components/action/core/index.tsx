import { Button, Menu } from 'antd'
import type { ButtonProps } from 'antd'
import { useContext } from 'react'

import Icon from '@/components/icon'

import { ActionContext } from '../actionContext'

export type ActionCoreProps = ButtonProps & {
  children?: string
  confirm?: boolean
  icon?: string
  noIcon?: boolean
  noText?: boolean
  onClick?: () => void
}

const ActionCore = (props: ActionCoreProps) => {
  const { confirm, noIcon, noText, ...attrs } = props
  const { name } = useContext(ActionContext)
  const isInDropdown = name === 'ActionDropdown'
  const buttonProps = {
    ...attrs,
    icon: noIcon ? null : attrs.icon
  }

  const renderMenuItem = () => {
    const onClick = attrs.onClick ? attrs.onClick : () => {}
    return (
      <Menu.Item onClick={onClick}>
        {attrs.icon ? <Icon icon={attrs.icon} className="mr-1" /> : null}
      </Menu.Item>
    )
  }

  const renderButton = () => {
    const content = noText ? null : attrs.children
    const button = <Button {...buttonProps}>{content}</Button>
    const buttonConfirm = <Button {...buttonProps}>{content}</Button>
    return confirm ? buttonConfirm : button
  }

  return isInDropdown ? renderMenuItem() : renderButton()
}

export default ActionCore
