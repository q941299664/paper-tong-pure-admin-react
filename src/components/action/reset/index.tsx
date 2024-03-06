import Core from '../core'
import type { CoreProps } from '../core'

export interface ResetProps extends CoreProps {}

const Reset = (props: ResetProps) => {
  return (
    <Core icon="icon-park-outline:undo" {...props}>
      刷新
    </Core>
  )
}

export default Reset
