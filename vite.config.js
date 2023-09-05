import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import fileChange from './plugins/fileChange'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    fileChange()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
