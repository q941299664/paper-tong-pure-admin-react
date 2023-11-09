import { Layout, Space, theme } from 'antd'
import type { CSSProperties } from 'react'
import { Outlet } from 'react-router-dom'

import Header, { headerStyle } from '@/components/layout/Header'
import SideBar from '@/components/layout/SideBar'

const footerStyle: CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  height: 40,
  lineHeight: '40px'
}

const { Content, Footer } = Layout

function LayoutApp() {
  const token = theme.useToken()

  return (
    <Space direction="vertical" size={[0, 48]} style={{ width: '100%' }}>
      <Layout>
        <Header />
        <Layout>
          <SideBar />
          <Layout style={{ padding: '0 24px' }}>
            <Content
              style={{
                padding: 10,
                background: '#eee',
                minHeight: `calc(100vh - ${headerStyle.height}px - ${footerStyle.height}px)`
              }}
            >
              <Outlet />
            </Content>
            <Footer style={footerStyle}>
              <a href="">footer</a>
            </Footer>
          </Layout>
        </Layout>
      </Layout>
    </Space>
  )
}

export default LayoutApp
