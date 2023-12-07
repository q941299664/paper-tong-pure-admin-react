import type { ReactNode } from 'react'

import { ActionContext } from '../actionContext'

export interface ActionDropdownProps {
  children: ReactNode
}

const ActionDropdown = (props: ActionDropdownProps) => {
  const { children } = props
  return (
    <ActionContext.Provider value={{ name: 'ActionDropdown' }}>
      <div>{children}</div>
    </ActionContext.Provider>
  )
}

export default ActionDropdown
