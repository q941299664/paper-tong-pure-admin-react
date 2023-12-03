import { useSize } from 'ahooks'
import { useRef, useState } from 'react'

export function useLayoutDashboardAffix() {
  const [affixed, setAffixed] = useState(false)

  const wrapperRef = useRef(null)
  const size = useSize(wrapperRef)

  function onChange(_affixed?: boolean) {
    setAffixed(_affixed ?? false)
  }

  return {
    affixed,
    wrapperRef,
    size,
    onChange
  }
}
