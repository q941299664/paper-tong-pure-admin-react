import { Divider } from 'antd'
import { Children, Fragment } from 'react'
import type { ReactNode } from 'react'

import { joinItem } from '@/utils'

interface DividerGroupProps {
  children: ReactNode
}

const DividerGroup = (props: DividerGroupProps) => {
  const { children } = props
  const divider = <Divider type="vertical" />
  const childList = Children.toArray(children)

  const result = joinItem(childList, divider)
  return result.map((item, index) => <Fragment key={index}>{item}</Fragment>)
}

export default DividerGroup
