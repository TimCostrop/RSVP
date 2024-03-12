import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        open: "https://localhost:5173",
        https: {
            key: `server.key`,
            cert: `server.crt`,
        }
    }
})
