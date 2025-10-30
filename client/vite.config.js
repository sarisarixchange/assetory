import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // default repo name for GitHub Pages
  const repo = 'assetory'

  // determine base path depending on mode
  let base = './' // local by default
  if (mode === 'github') base = `/${repo}/`
  else if (mode === 'mcmaster') base = '/'
  else if (mode === 'devlocal') base = './' // new name for local builds


  return {
    plugins: [
      vue({
        template: {
          compilerOptions: {
            isCustomElement: tag => tag.startsWith('a-') // for <a-scene>, etc.
          }
        }
      }),
      vueDevTools(),
    ],
    base,
    server: {
      historyApiFallback: true,
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: undefined,
        },
      },
    },
  }
})
