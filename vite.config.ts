import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],

  resolve: {
    alias: {
        /* Application aliases */
        '@entities': '/src/entities',
        '@features': '/src/features',
        '@widgets': '/src/widgets',
        '@app': '/src/app',
        '@shared': '/src/shared',
    },
},
})
