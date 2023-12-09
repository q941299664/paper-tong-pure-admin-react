import { Menu } from 'antd'
import { omit } from 'lodash-es'
import { useContext } from 'react'

import Button from '@/components/button'
import type { ButtonProps } from '@/components/button'
import ButtonConfirm from '@/components/button/confirm'
import type { ButtonConfirmProps } from '@/components/button/confirm'
import Icon from '@/components/icon'

import { ActionContext } from '../actionContext'

export type ActionCoreProps = ButtonProps & {
  confirm?: boolean
  confirmTitle?: string
  icon?: string
  noIcon?: boolean
  noText?: boolean
  onClick?: () => void
}

const ActionCore = (props: ActionCoreProps) => {
  const { confirm, noIcon, noText, ...attrs } = props
  const { name } = useContext(ActionContext)
  const isInDropdown = name === 'ActionDropdown'
  let buttonProps = {
    ...attrs,
    icon: noIcon ? null : attrs.icon
  }

  if (!confirm) {
    buttonProps = omit(buttonProps, ['confirmTitle'])
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
    const button = <Button {...(buttonProps as ButtonProps)}>{content}</Button>
    const buttonConfirm = (
      <ButtonConfirm {...(buttonProps as ButtonConfirmProps)}>{content}</ButtonConfirm>
    )
    return confirm ? buttonConfirm : button
  }

  return isInDropdown ? renderMenuItem() : renderButton()
}

export default ActionCore
