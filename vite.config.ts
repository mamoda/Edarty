import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    hmr: {
      // الحفاظ على حالة التطبيق أثناء التحديث السريع
      overlay: true,
    },
    watch: {
      // تجاهل بعض الملفات لتسريع الأداء
      ignored: ['**/node_modules/**', '**/dist/**'],
    },
  },
  build: {
    // تحسينات للبناء
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },
  // إضافة تعريفات للـ environment variables
  define: {
    'process.env.VITE_APP_VERSION': JSON.stringify(process.env.npm_package_version),
  },
});