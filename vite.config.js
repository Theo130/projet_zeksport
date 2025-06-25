import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';

export default defineConfig({
  server: {
    host: '127.0.0.1',
    port: 5173,
    strictPort: true, // important pour éviter les ports aléatoires
  },
  plugins: [
    laravel({
      input: ['resources/js/app.jsx', 'resources/css/app.css'],
      refresh: true,
    }),
  ],
});
