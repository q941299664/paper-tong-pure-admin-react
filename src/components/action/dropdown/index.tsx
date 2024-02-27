import { Dropdown as AntdDropdown } from 'antd';
import type { DropdownProps as AntdDropdownProps } from 'antd';

import Core from '../core';

export interface DropdownProps extends AntdDropdownProps {}

const Dropdown = (props: DropdownProps) => {
  const { menu } = props;

  return (
    <AntdDropdown menu={menu}>
      <Core type="link" icon="icon-park-outline:down" iconRight>
        更多操作
      </Core>
    </AntdDropdown>
  );
};

export default Dropdown;
