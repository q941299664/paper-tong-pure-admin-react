import Core from '../core'
import type { CoreProps } from '../core'

export interface EditProps extends CoreProps {}

const Edit = (props: EditProps) => {
  const attrs = {
    icon: 'icon-park-outline:edit',
    ...props
  }
  return <Core {...attrs}>修改</Core>
}

export default Edit
