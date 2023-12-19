import { useLocation } from 'react-router-dom'

import { storage } from './storage'
import { id8 } from './string'

export const bridgeKey = 'bridge'

function key(id: string) {
  return `bridge-${id}`
}

export function bridgeSet(data: any) {
  const id = id8()
  storage.set(key(id), JSON.stringify(data))
  return id
}

export function bridgeGet(id: string) {
  const data = storage.get(key(id))
  return data ? JSON.parse(data) : {}
}

export function useBridge() {
  const { search } = useLocation()
  const query = new URLSearchParams(search)
  const bridgeID = query.get('bridge')
  return bridgeID ? bridgeGet(bridgeID) : null
}
