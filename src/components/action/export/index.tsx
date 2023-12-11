import Core from '../core'
import type { CoreProps } from '../core'

export interface ExportProps extends CoreProps {}

const Export = (props: ExportProps) => {
  const attrs = {
    icon: 'icon-park-outline:download-two',
    ...props
  }
  return <Core {...attrs}>导出</Core>
}

export default Export
