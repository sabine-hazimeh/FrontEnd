import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// vite.config.mjs

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
});

