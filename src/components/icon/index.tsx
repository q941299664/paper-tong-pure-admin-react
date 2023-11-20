import { Icon } from '@iconify/react'
import type { IconProps } from '@iconify/react'

import './icon.scss'

export default function Index(props: IconProps) {
  return (
    <div className="icon">
      <Icon {...props} />
    </div>
  )
}
