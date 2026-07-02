import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// PWA is disabled locally if the project path contains special characters
// (e.g., apostrophes) that break Workbox's SW template generation.
// It works correctly on CI/CD where paths are clean.
const enablePWA = !process.cwd().includes("'")

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    ...(enablePWA ? [VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png'],
      manifest: {
        name: 'Tenet Workshop Inventory',
        short_name: 'Tenet Workshop',
        description: 'Track and manage items across workshop drawers with QR code scanning',
        theme_color: '#0a0c10',
        background_color: '#0a0c10',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
      },
    })] : []),
  ],
})
