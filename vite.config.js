import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

import watchFile from './plugins/watchFile'
import directiveFileChangeConfig from './util-chore/directiveFileChangeConfig'
import storeFileChangeConfig from './util-chore/storeFileChangeConfig'

// https://vitejs.dev/config/
export default defineConfig(({ mode, command, ssrBuild }) => {
  const env = loadEnv(mode, process.cwd())
  const isProd = mode === 'production'
  console.log(env.VITE_APP_BASE_API)
  return {
    plugins: [
      vue(),
      watchFile(directiveFileChangeConfig.baseDirUrl, directiveFileChangeConfig.handler),
      watchFile(storeFileChangeConfig.baseDirUrl, storeFileChangeConfig.handler),
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
          rewrite: (path) => path.replace(RegExp(`^${env.VITE_APP_BASE_API}`), '')
        }
      }
    },
    build: {
      target: ['chrome52'],
      cssTarget: ['chrome52'],
      sourcemap: !isProd, // 是否生成源码映射
      outDir: 'dist', // 打包输出目录
      assetsDir: 'assets', // 静态资源目录
      assetsInlineLimit: 4096, // 在这个大小以下的文件将会被编译成 base64，减少请求数量
      minify: 'terser',
      terserOptions: {
          compress: {
              drop_console: isProd,
              drop_debugger: isProd,
          }
      },
      rollupOptions: {
        // external: ['vue', 'vue-router', 'axios'],
        external: [],
        output: {
          // globals: {
          //   vue: 'Vue'
          // }
        },
        plugins: []
      }
    }
  }
})
