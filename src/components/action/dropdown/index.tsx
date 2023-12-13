import { Dropdown as AntdDropdown } from 'antd'
import type { DropdownProps as AntdDropdownProps } from 'antd'

import Icon from '@/components/icon'

export interface DropdownProps extends AntdDropdownProps {}

const Dropdown = (props: DropdownProps) => {
  const { menu } = props

  return (
    <AntdDropdown menu={menu}>
      <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
        <span>更多操作</span>
        <Icon icon="icon-park-outline:down" />
      </a>
    </AntdDropdown>
  )
}

export default Dropdown
