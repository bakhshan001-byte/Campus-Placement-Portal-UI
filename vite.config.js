import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      // Isse deployment ke compatibility errors bypass ho jayenge
      external: [],
    },
  },
})
