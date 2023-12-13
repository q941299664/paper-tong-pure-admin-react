import type { ReactNode } from 'react'

import { DisplayName } from './constants'

export interface LeftProps {
  children: ReactNode
}

const Left = (props: LeftProps) => {
  const { children } = props
  return <div>{children}</div>
}

Left.displayName = DisplayName.Left

export default Left
