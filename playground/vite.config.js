import { defineConfig } from 'vite'
import transformJsxInJs from '..'

export default defineConfig({
  plugins: [transformJsxInJs({
    include: ['utils/index.js', 'b.js', 'main.js']
  })]
})