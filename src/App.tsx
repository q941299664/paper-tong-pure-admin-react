import { App as AntdApp } from 'antd'
import 'virtual:uno.css'

import { ThemeProvider } from '@/providers/ThemeProvider'

import Router from './router'

export default function App() {
  return (
    <AntdApp>
      <ThemeProvider>
        <Router />
      </ThemeProvider>
    </AntdApp>
  )
}
