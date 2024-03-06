import type { ReactNode } from 'react'

import { DisplayName } from './constants'

export interface RightProps {
  children: ReactNode
}

const Right = (props: RightProps) => {
  const { children } = props
  return <div>{children}</div>
}

Right.displayName = DisplayName.Right

export default Right
