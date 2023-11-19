import type { ReactElement } from 'react'

function HeaderGroup({ children }: { children: ReactElement }) {
  return <div className="flex flex-row p-2">{children}</div>
}

export default HeaderGroup
