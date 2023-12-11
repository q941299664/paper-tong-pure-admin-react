import Core from '../core'
import type { CoreProps } from '../core'

export interface ExportProps extends CoreProps {}

const Export = (props: ExportProps) => {
  return (
    <Core icon="icon-park-outline:download-two" {...props}>
      导出
    </Core>
  )
}

export default Export
