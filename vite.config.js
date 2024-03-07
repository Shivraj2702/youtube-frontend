import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy : {
      '/api': 'http://localhost:7000/api/v1'
    },
  },
  plugins: [react()],
})
