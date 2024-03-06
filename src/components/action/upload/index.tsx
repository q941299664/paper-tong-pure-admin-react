import Core from '../core'
import type { CoreProps } from '../core'

export interface UploadProps extends CoreProps {}

const Upload = (props: UploadProps) => {
  return (
    <Core icon="icon-park-outline:upload-one" {...props}>
      上传
    </Core>
  )
}

export default Upload
