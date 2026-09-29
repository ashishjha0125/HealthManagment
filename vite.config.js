import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
      '@components': '/src/components',
      '@pages': '/src/pages',
      '@hooks': '/src/hooks',
      '@services': '/src/services',
      '@utils': '/src/utils',
      '@context': '/src/context',
      '@assets': '/src/assets',
      '@styles': '/src/styles',
    },
  },
  server: {
    host: '0.0.0.0', // Allows network access
    watch: {
      // Ignore heavy non-web files from file watcher
      ignored: ['**/*.pth', '**/*.pt', '**/food_analyzer_*'],
    },
  },
  // Pre-bundle heavy dependencies so they load faster on page refresh
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      '@supabase/supabase-js',
      'chart.js',
      'react-chartjs-2',
      'react-hot-toast',
      'lucide-react',
      'react-dropzone',
    ],
    // Exclude TF.js from pre-bundling (it's commented out anyway)
    exclude: ['@tensorflow/tfjs', '@tensorflow-models/mobilenet'],
  },
  build: {
    // Chunk large vendor libs separately for faster loading
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-supabase': ['@supabase/supabase-js'],
          'vendor-charts': ['chart.js', 'react-chartjs-2'],
        },
      },
    },
  },
});
