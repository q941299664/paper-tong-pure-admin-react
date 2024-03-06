import { useSize } from 'ahooks'
import { useRef, useState } from 'react'

import { useAffixAutoUpdate } from '@/hooks/useAffixAutoUpdate'

export const useLayoutDashboardAffix = () => {
  const { affixRef, updatePosition } = useAffixAutoUpdate()

  const [affixed, setAffixed] = useState(false)

  const wrapperRef = useRef(null)
  const size = useSize(wrapperRef)

  const onChange = (_affixed?: boolean) => {
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
