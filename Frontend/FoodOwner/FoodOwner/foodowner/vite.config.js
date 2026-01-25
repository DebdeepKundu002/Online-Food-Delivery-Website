// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   alias: {
//     '@components': '/src/components',
//   },
// })
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/foodowner/',  // IMPORTANT: matches Nginx location
  resolve: {
    alias: {
      '@components': '/src/components',
    },
  },
})
