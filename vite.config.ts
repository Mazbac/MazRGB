import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Relative assets allow the production renderer to load from Electron's file:// URL.
export default defineConfig({
  base: './',
  plugins: [react()],
})
