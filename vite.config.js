import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      // Compatibility aur external library check ko standard par rakha hai
      external: []
    }
  }
})
