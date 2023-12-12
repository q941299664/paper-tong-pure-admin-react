import Core from '../core'
import type { CoreProps } from '../core'

export interface SaveProps extends CoreProps {}

const Save = (props: SaveProps) => {
  return (
    <Core icon="icon-park-outline:disk" type="primary" htmlType="submit" {...props}>
      保存
    </Core>
  )
}

export default Save
