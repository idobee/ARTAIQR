import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/ARTAIQR/', // Pages URL: https://idobee.github.io/ARTAIQR/
});
