import { Affix } from 'antd'
import classnames from 'classnames'
import { useEffect } from 'react'
import type { ReactElement } from 'react'

import { HEADER_HEIGHT } from '../../constants'
import { useLayoutDashboardAffix } from '../useLayoutDashboardAffix'

export interface AffixTopProps {
  children: ReactElement
  onHeightChange?: (height: number) => void
}

function Index(props: AffixTopProps) {
  const { children, onHeightChange } = props

  const { affixed, wrapperRef, size, onChange } = useLayoutDashboardAffix()

  useEffect(() => {
    if (size?.height && size.height > 0 && onHeightChange) {
      onHeightChange(size.height)
    }
  }, [size, onHeightChange])

  const wrapperClassnames = classnames('border-gray-200', {
    'bg-white border-b': affixed
  })

  const wrapperStyle = {
    boxShadow: affixed ? '0px 5px 10px rgba(209 213 219 / 0.1)' : 'none'
  }

  return (
    <Affix offsetTop={HEADER_HEIGHT} onChange={onChange}>
      <div ref={wrapperRef} className={wrapperClassnames} style={wrapperStyle}>
        <div className="px-6 py-4">{children}</div>
      </div>
    </Affix>
  )
}

export default Index
