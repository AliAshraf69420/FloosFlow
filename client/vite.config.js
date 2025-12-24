import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // FORCE the production URL - this WILL work
    '__VITE_API_URL__': JSON.stringify('https://floosflow-production.up.railway.app')
  },
  server: {
    host: '0.0.0.0',
    port: parseInt(process.env.PORT) || 5173,
  },
  preview: {
    host: '0.0.0.0',
    port: parseInt(process.env.PORT) || 8080,
    strictPort: false,
    allowedHosts: true
  }
})