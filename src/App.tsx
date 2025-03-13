import { App as AntdApp } from 'antd'
import 'virtual:uno.css'

import { TransitionProvider } from '@/contexts'
import { ThemeProvider } from '@/providers/ThemeProvider'

import Router from './router'

export default function App() {
  return (
    <AntdApp>
      <ThemeProvider>
        <TransitionProvider>
          <Router />
        </TransitionProvider>
      </ThemeProvider>
    </AntdApp>
  )
}
