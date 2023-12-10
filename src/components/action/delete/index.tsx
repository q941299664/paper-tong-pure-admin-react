import ActionCore from '../core'

const ActionDelete = () => {
  const props = {
    confirmTitle: '确认删除？',
    confirmOkText: '删除',
    confirmCancelText: '取消',
    icon: 'icon-park-outline:delete',
    danger: true
  }

  return <ActionCore {...props}>删除</ActionCore>
}

export default ActionDelete
