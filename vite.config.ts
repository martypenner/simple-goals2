import { sentryVitePlugin } from '@sentry/vite-plugin';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    sentryVitePlugin({
      org: 'self-employed-3t',
      project: 'simple-goals',
    }),
  ],
  build: {
    // Default build target
    target: 'modules',
    sourcemap: true,
  },
});
