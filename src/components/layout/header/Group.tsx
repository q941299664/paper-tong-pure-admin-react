import type { ReactElement } from 'react'

function Group({ children }: { children: ReactElement }) {
  return <div className="flex flex-row p-2">{children}</div>
}

export default Group
