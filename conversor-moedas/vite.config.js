import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ✅ ajuste importante para o GitHub Pages
export default defineConfig({
  plugins: [react()],
  base: '/conversor-moedas/', 
})
