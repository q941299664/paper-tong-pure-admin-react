import { resolve } from 'path'

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const res = (path: string) => resolve(__dirname, path)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': res('src')
    }
  }
})
