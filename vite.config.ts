import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/react-iframe/',
  plugins: [react()],
  server: {
    fs: {
      strict: false,
    },
  },
});
