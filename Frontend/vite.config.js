import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/v2': {
        target: 'https://api.apis.net.pe',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/v2/, '/v2'),
      },
    }
  }
})
