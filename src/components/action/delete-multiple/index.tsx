import ActionDelete from '../delete'
import type { ActionDeleteProps } from '../delete'

interface ActionDeleteMultipleProps extends ActionDeleteProps {
  count: number
}

const ActionDeleteMultiple = (props: ActionDeleteMultipleProps) => {
  const { count, ...attrs } = props

  return (
    <ActionDelete confirmTitle={`确认要删除 ${count} 条记录吗 ？`} {...attrs}>
      删除
    </ActionDelete>
  )
}

export default ActionDeleteMultiple
