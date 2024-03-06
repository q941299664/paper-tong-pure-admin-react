import Delete from '../delete'
import type { DeleteProps } from '../delete'

export interface DeleteMultipleProps extends DeleteProps {
  count: number
}

const DeleteMultiple = (props: DeleteMultipleProps) => {
  const { count, ...attrs } = props

  return (
    <Delete confirmTitle={`确认要删除 ${count} 条记录吗 ？`} {...attrs}>
      删除
    </Delete>
  )
}

export default DeleteMultiple
