import { useSize } from 'ahooks'
import { useRef, useState } from 'react'

import { useAffixAutoUpdate } from '@/hooks/useAffixAutoUpdate'

export interface AffixRef {
  updatePosition: () => void
}

export function useLayoutDashboardAffix() {
  const { affixRef, updatePosition } = useAffixAutoUpdate()

  const [affixed, setAffixed] = useState(false)

  const wrapperRef = useRef(null)
  const size = useSize(wrapperRef)

  function onChange(_affixed?: boolean) {
    setAffixed(_affixed ?? false)
  }

  return {
    affixed,
    affixRef,
    wrapperRef,
    size,
    updatePosition,
    onChange
  }
}
