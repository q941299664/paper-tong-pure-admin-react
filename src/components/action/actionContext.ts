import { createContext } from 'react'

interface ActionContextProps {
  name: string
}

export const ActionContext = createContext<ActionContextProps>({ name: '' })
