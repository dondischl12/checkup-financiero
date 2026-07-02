import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    rollupOptions: {
      output: {
        // Split heavy vendors into separate, long-cacheable chunks so the
        // initial app chunk stays small. PDF libs (jspdf/html2canvas) are
        // already lazy-loaded on demand from SnapshotPage.
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          charts: ['recharts'],
          icons: ['lucide-react'],
        },
      },
    },
  },
})
