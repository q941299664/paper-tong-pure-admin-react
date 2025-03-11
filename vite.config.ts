import react from '@vitejs/plugin-react'
import { dirname, resolve } from 'node:path'
import { fileURLToPath, URL } from 'node:url'
import UnoCSS from 'unocss/vite'
import { defineConfig, loadEnv } from 'vite'
import Pages from 'vite-plugin-pages'

import { svgToIconify } from './vite-plugins'

// import { getRouteMeta } from './src/router/routeMeta'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())

  const { VITE_PORT, VITE_BASE_URL } = env

  return {
    base: VITE_BASE_URL,
    server: {
      port: Number.parseInt(VITE_PORT),
    },
    plugins: [
      Pages({
        exclude: ['**/component{,s}/**'],
        // extendRoute(route) {
        //   const meta = getRouteMeta(route.path)

        //   if (meta) {
        //     return {
        //       ...route,
        //       meta,
        //     }
        //   }

        //   return route
        // },
      }),
      react(),
      UnoCSS(),
      svgToIconify({
        svgDir: fileURLToPath(new URL('./src/assets/svg-icon', import.meta.url)),
        prefix: 'icon-local',
        dts: fileURLToPath(new URL('./types/virtual-local-icons.d.ts', import.meta.url)),
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  }
})
