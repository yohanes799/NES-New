import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/NES-New/',
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://berita-indo-api-next.vercel.app',
        changeOrigin: true,
        secure: false, // In case of HTTPS issues
      }
    }
  }
})
