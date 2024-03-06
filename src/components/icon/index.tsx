import { Icon as Iconify } from '@iconify/react'
import type { IconProps } from '@iconify/react'

import './icon.scss'

const Icon = (props: IconProps) => {
  return (
    <div className="icon">
      <Iconify {...props} />
    </div>
  )
}

export default Icon
