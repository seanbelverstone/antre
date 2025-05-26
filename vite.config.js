import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ command }) => {
  const config = {
    plugins: [react()],
  };

  if (command === 'build') {
    config.base = '/antre/'; // <--- ABSOLUTELY ESSENTIAL for clean URLs on GH Pages project
  } else {
    config.base = '/';
  }

  return config;
});