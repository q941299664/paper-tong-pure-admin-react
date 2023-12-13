import { omit } from 'lodash-es'

import Button from '@/components/button'
import type { ButtonProps } from '@/components/button'
import ButtonConfirm from '@/components/button/confirm'
import type { ButtonConfirmProps } from '@/components/button/confirm'

export type CoreProps = ButtonProps & {
  confirm?: boolean
  confirmTitle?: string
  icon?: string
  noIcon?: boolean
  noText?: boolean
  onClick?: () => void
}

const Core = (props: CoreProps) => {
  const { confirm, noIcon, noText, ...attrs } = props
  let buttonProps = {
    ...attrs,
    icon: noIcon ? null : attrs.icon
  }

  if (!confirm) {
    buttonProps = omit(buttonProps, ['confirmTitle'])
  }

  const content = noText ? null : attrs.children
  const button = <Button {...(buttonProps as ButtonProps)}>{content}</Button>
  const buttonConfirm = (
    <ButtonConfirm {...(buttonProps as ButtonConfirmProps)}>{content}</ButtonConfirm>
  )
  return confirm ? buttonConfirm : button
}

export default Core
