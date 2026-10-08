import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vite konfigurácia pre React + JSX
// defineConfig poskytuje IntelliSense pre konfiguráciu Vite
export default defineConfig({
  base: '/baren/',
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
  },
})
