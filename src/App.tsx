import { App as AntdApp } from 'antd'
import 'virtual:uno.css'
import {
  BrowserRouter,
} from 'react-router-dom'

import { ThemeProvider } from '@/providers/ThemeProvider'

import Router from './router'

export default function App() {
  return (
    <ThemeProvider>
      <AntdApp>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </AntdApp>
    </ThemeProvider>
  )
}
