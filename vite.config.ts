import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(() => {

  const appTarget = process.env.APP_TARGET || 'offline';
  const isOnlineAppTarget = appTarget === 'online';
  return {
    plugins: [react()],
    base: isOnlineAppTarget ? 'DeepView_frontend/' : '',
    build: {
      outDir: isOnlineAppTarget ? 'dist' : 'offline-dist'
    }
  };
})
