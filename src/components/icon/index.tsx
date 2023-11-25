import { Icon } from '@iconify/react'
import type { IconProps } from '@iconify/react'

import './icon.scss'

function Index(props: IconProps) {
  return (
    <div className="icon">
      <Icon {...props} />
    </div>
  )
}

export default Index
