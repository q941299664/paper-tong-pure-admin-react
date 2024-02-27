import Core from '../core';
import type { CoreProps } from '../core';

export interface DeleteProps extends CoreProps {
  confirmOkText?: string;
  confirmCancelText?: string;
}

const Delete = (props: DeleteProps) => {
  const attrs = {
    confirm: true,
    confirmTitle: '确认删除？',
    confirmOkText: '删除',
    confirmCancelText: '取消',
    icon: 'icon-park-outline:delete',
    danger: true,
    ...props,
  };

  return <Core {...attrs}>删除</Core>;
};

export default Delete;
