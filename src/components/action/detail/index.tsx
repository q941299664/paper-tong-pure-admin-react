import Core from '../core'
import type { CoreProps } from '../core'

export interface DetailProps extends CoreProps {}

const Detail = (props: DetailProps) => {
  const attrs = {
    icon: 'icon-park-outline:doc-detail',
    ...props
  }
  return <Core {...attrs}>新建</Core>
}

export default Detail
