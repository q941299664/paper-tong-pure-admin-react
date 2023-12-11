import Core from '../core'
import type { CoreProps } from '../core'

export interface RefreshProps extends CoreProps {}

const Refresh = (props: RefreshProps) => {
  return (
    <Core icon="icon-park-outline:refresh" {...props}>
      刷新
    </Core>
  )
}

export default Refresh
