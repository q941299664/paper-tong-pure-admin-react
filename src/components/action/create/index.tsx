import Core from '../core'
import type { CoreProps } from '../core'

export interface CreateProps extends CoreProps {}

const Create = (props: CreateProps) => {
  const attrs = {
    icon: 'icon-park-outline:add-one',
    ...props
  }
  return <Core {...attrs}>新建</Core>
}

export default Create
