import type { ReactNode } from 'react'

import { DisplayName } from './constants'

export interface DefaultProps {
  children: ReactNode
}

const Default = (props: DefaultProps) => {
  const { children } = props
  return <div>{children}</div>
}

Default.displayName = DisplayName.Default

export default Default
