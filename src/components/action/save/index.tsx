import Core from '../core'
import type { CoreProps } from '../core'

export interface SaveProps extends CoreProps {}

const Save = (props: SaveProps) => {
  return (
    <Core type="primary" htmlType="submit" icon="icon-park-outline:disk" {...props}>
      保存
    </Core>
  )
}

export default Save
