import { Layout } from 'antd'

import type { CSSProperties } from 'react'

import { useUserInfoStore } from '@/stores'

const { Header: AntdHeader } = Layout

export const headerStyle: CSSProperties = {
  height: 64
}

function Header() {
  const userInfo = useUserInfoStore(state => state.userInfo)

  return (
    <AntdHeader>
      <div className="text-right text-white">Welcome, {userInfo?.email}</div>
    </AntdHeader>
  )
}

export default Header
