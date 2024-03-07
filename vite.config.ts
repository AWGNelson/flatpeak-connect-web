import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig(({mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    base: "/",
    plugins: [react()],
    define: {
      CONNECT_API_URL: `"${env.CONNECT_API_URL}"`
    },
    preview: {
      port: 7070,
      strictPort: true,
    }
  }
})
