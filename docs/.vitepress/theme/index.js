import DefaultTheme from 'vitepress/theme'
import Layout from './Layout.vue'
import './style.css'

// Import KaTeX CSS and JS
import 'katex/dist/katex.min.css'
import katex from 'katex'

// Customize VitePress' markdown rendering
export default {
  ...DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.config.globalProperties.$katex = katex
  }
}
