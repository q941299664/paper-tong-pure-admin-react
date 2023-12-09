import { Popconfirm } from 'antd'
import type { PopconfirmProps } from 'antd'
import { camelCase, keys, mapKeys, pickBy } from 'lodash-es'

import Button from './index'
import type { ButtonProps } from './index'

export type ButtonConfirmProps = PrefixKeys<PopconfirmProps, 'confirm'> &
  ButtonProps & {
    confirmTitle: string
    onClick?: () => void
  }

const ButtonConfirm = (props: ButtonConfirmProps) => {
  const { children, onClick, ...attrs } = props
  const attrsKeys = keys(attrs)
  const confirmPropKeys: string[] = attrsKeys.filter(key => key.startsWith('confirm'))
  const confirmProps = mapKeys(
    pickBy(attrs, (_value, key) => confirmPropKeys.includes(key)),
    (_value, key) => camelCase(key.replace(/^confirm/, ''))
  ) as PopconfirmProps
  const buttonProps = pickBy(attrs, (_value, key) => !key.startsWith('confirm'))

  return (
    <Popconfirm {...confirmProps} onConfirm={onClick}>
      <Button {...buttonProps}>{children}</Button>
    </Popconfirm>
  )
}

export default ButtonConfirm
