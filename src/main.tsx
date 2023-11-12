import { StyleProvider } from '@ant-design/cssinjs'
import { App as AntdApp, ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import React from 'react'
import ReactDOM from 'react-dom/client'

import '@/styles/index.scss'

import App from './App'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ConfigProvider locale={zhCN}>
      <AntdApp>
        <StyleProvider hashPriority="high">
          <App />
        </StyleProvider>
      </AntdApp>
    </ConfigProvider>
  </React.StrictMode>
)
