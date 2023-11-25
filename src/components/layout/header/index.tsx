import { useScroll } from 'ahooks'
import classnames from 'classnames'
import type { CSSProperties } from 'react'

import { useUserInfoStore } from '@/stores'

import { HEADER_HEIGHT, SIDEBAR_WIDTH } from '../constants'

import Group from './Group'
import Search from './Search'
import Title from './Title'

function Index() {
  const scroll = useScroll(document)

  const classNamesMain = classnames(
    'fixed top-0 right-0 z-10 flex flex-row justify-between items-center',
    'hover:bg-white hover:shadow-xl hover:shadow-gray-300/10',
    {
      'bg-white shadow-xl shadow-gray-300/10': scroll && scroll.top > 0
    }
  )

  const headerStyle: CSSProperties = {
    height: HEADER_HEIGHT,
    left: SIDEBAR_WIDTH
  }

  const userInfo = useUserInfoStore(state => state.userInfo)

  return (
    <div className={classNamesMain} style={headerStyle}>
      <Group>
        <Title />
      </Group>
      <Group>
        <Search />
      </Group>
      <Group>
        <div className="text-right">{userInfo?.email}</div>
      </Group>
    </div>
  )
}

export default Index
