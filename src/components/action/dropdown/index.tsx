import type { ReactNode } from 'react'

import { ActionContext } from '../actionContext'

export interface DropdownProps {
  children: ReactNode
}

const Dropdown = (props: DropdownProps) => {
  const { children } = props
  return (
    <ActionContext.Provider value={{ name: 'Dropdown' }}>
      <div>{children}</div>
    </ActionContext.Provider>
  )
}

export default Dropdown
