import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Change VITE_BASE_URL to match your GitHub repo name when deploying
// e.g. VITE_BASE_URL=/vrushank-portfolio/ npm run build
export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE_URL || '/',
})
