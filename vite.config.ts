import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import svrPlugin from 'vite-plugin-svgr';
import prerender from '@prerenderer/rollup-plugin';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svrPlugin(),
    prerender({
      routes: [
        '/',
        '/tarot',
        '/tarot/result',
        '/tarot/card',
        '/saju',
        '/saju/today',
        '/saju/result',
        '/naming',
        '/naming/result',
        '/dream/result',
        '/dream/result',
        '/myPage',
      ],
      renderer: '@prerenderer/renderer-puppeteer',
      rendererOptions: {
        maxConcurrentRoutes: 1,
        renderAfterTime: 500,
      },
      postProcess(renderedRoute) {
        renderedRoute.html = renderedRoute.html
          .replace(/http:/i, 'https:') // HTTP 링크를 HTTPS로 변경
          .replace(/(localhost|127\.0\.0\.1):\d*/i, 'https://fortunescape.co.kr'); // URL 수정
      },
    }),
  ],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
