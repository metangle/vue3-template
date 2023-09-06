import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

import fileChange from './plugins/fileChange'

// https://vitejs.dev/config/
export default defineConfig(({ mode, command, ssrBuild }) => {
  const env = loadEnv(mode, process.cwd());
  console.log(env.VITE_APP_BASE_API);
  return {
    plugins: [
      vue(),
      fileChange()
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server: {
      // http://localhost:5173/api/login -> http://localhost:3001/login
      proxy: {
        [env.VITE_APP_BASE_API]: {
          target: env.VITE_SERVE,
          changeOrigin: true,
          rewrite: path => path.replace(RegExp(`^${env.VITE_APP_BASE_API}`), '')
        }
      }
    },
  }
})
