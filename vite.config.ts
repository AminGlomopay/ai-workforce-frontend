import path from 'path';

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { tanstackRouter } from '@tanstack/router-plugin/vite';

export default defineConfig({
  plugins: [tanstackRouter({ target: 'react', autoCodeSplitting: true, quoteStyle: 'single' }), react(), tailwindcss()],
  server: {
    port: 4719,
    strictPort: true,
    proxy: {
      '/auth': 'http://localhost:51515',
      '/workflow-node-types': 'http://localhost:51515',
      '/workflow-executions': 'http://localhost:51515',
      '/workflows': {
        target: 'http://localhost:51515',
        bypass: (req) => (req.headers.accept?.includes('text/html') ? req.url : undefined),
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
});
