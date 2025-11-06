// vite.config.js
import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig(({ command }) => {
  const isProd = command === 'build'

  return {
    // GitHub Pages(https://<user>.github.io/game1/)용 base
    // 로컬 개발(dev)일 땐 '/', 빌드(build)일 땐 '/game1/'
    base: isProd ? '/game1/' : '/',

    server: {
      host: true,
      port: 5173,
      open: true,
      strictPort: true,
    },

    build: {
      // (옵션) main 브랜치의 /docs를 Pages 소스로 쓰고 싶으면 주석 해제
      // outDir: 'docs',

      rollupOptions: {
        // 🔹 멀티 페이지 엔트리 등록
        input: {
          index:   resolve(__dirname, 'index.html'),
          context: resolve(__dirname, 'context/context.html'),
          // explain 페이지가 있다면 주석 해제
          // explain: resolve(__dirname, 'explain/explain.html'),

          book1:   resolve(__dirname, 'book1/book1.html'),
          book2:   resolve(__dirname, 'book2/book2.html'),
          book3:   resolve(__dirname, 'book3/book3.html'),
          book4:   resolve(__dirname, 'book4/book4.html'),
          book5:   resolve(__dirname, 'book5/book5.html'),
          book6:   resolve(__dirname, 'book6/book6.html'),
        },
      },
    },
  }
})
