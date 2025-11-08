import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Configuración básica de Vite para React
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Puerto de desarrollo
    open: true  // Abre el navegador automáticamente
  }
})