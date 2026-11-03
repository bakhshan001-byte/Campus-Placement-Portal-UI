import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Standard robust production config for React + Vite
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    emptyOutDir: true
  }
})
