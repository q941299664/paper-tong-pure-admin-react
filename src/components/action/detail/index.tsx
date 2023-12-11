import Core from '../core'
import type { CoreProps } from '../core'

export interface DetailProps extends CoreProps {}

const Detail = (props: DetailProps) => {
  return (
    <Core icon="icon-park-outline:doc-detail" {...props}>
      新建
    </Core>
  )
}

export default Detail
