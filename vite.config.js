import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    hmr: {
      // Add these settings to prevent HMR conflicts
      protocol: 'ws',
      host: 'localhost',
      port: 5173, // Match your dev server port
    },
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  optimizeDeps: {
    // Force dependency optimization
    include: ['react', 'react-dom'],
  },

})
