import ActionCore from '../core'
import type { ActionCoreProps } from '../core'

export interface ActionCreateProps extends ActionCoreProps {}

const ActionCreate = (props: ActionCreateProps) => {
  return (
    <ActionCore icon="icon-park-outline:add-one" {...props}>
      新建
    </ActionCore>
  )
}

export default ActionCreate
