import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import process from 'node:process';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  
  const API_KEY = env.API_KEY || 'AIzaSyBc2vFDDrBBfgvGk1Olw3GgYwTZPc-su7k';

  return {
    plugins: [react()],
    define: {
      'process.env.API_KEY': JSON.stringify(API_KEY),
      'process.env': {
        API_KEY: API_KEY,
      }
    },
    server: {
      port: 3000,
      open: true
    }
  };
});