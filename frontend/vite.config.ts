import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  let PORT = 5173
  if (env.VITE_PORT) {
    PORT = parseInt(env.VITE_PORT, 10)
  }
  return {
    plugins: [react()],
    assetsInclude: ['**/*.md'],
    server: {
      port: PORT,
    }
  }
})
