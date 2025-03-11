import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@ant-design/v5-patch-for-react-19'
import 'antd/dist/reset.css'
import 'virtual:uno.css'
import 'virtual:local-icons'

import { setupI18n } from '@/locales'

import App from './App.tsx'

setupI18n()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
