import { useThrottleEffect } from 'ahooks'
import throttleByAnimationFrame from 'antd/lib/_util/throttleByAnimationFrame'
import { useRef } from 'react'
import { useWindowSize } from 'react-use'

export interface AffixRef {
  updatePosition: ReturnType<typeof throttleByAnimationFrame>
}

export function useAffixAutoUpdate() {
  const affixRef = useRef<AffixRef>(null)
  const { width } = useWindowSize()

  const updatePosition = () => {
    affixRef.current?.updatePosition()
  }

  useThrottleEffect(updatePosition, [width], {
    wait: 300
  })

  return {
    affixRef,
    updatePosition
  }
}
