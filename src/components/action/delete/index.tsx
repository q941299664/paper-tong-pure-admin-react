import ActionCore from '../core'
import type { ActionCoreProps } from '../core'

export interface ActionDeleteProps extends ActionCoreProps {}

const ActionDelete = (props: ActionDeleteProps) => {
  const actionProps = {
    ...props,
    confirmTitle: '确认删除？',
    confirmOkText: '删除',
    confirmCancelText: '取消',
    icon: 'icon-park-outline:delete',
    danger: true
  }

  return <ActionCore {...actionProps}>删除</ActionCore>
}

export default ActionDelete
