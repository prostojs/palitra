import { defineConfig } from 'vitepress'
import UnoCSS from 'unocss/vite'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Palitra',
  description: 'Palitra Documentation',
  vite: {
    plugins: [UnoCSS()],
    server: {
      host: '0.0.0.0',
    },
    build: {
      rollupOptions: {},
    },
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Sandbox', link: '/sandbox/shades.md' },
      { text: 'Documentation', link: '/doc/overview.md' },
    ],

    sidebar: {
      '/sandbox/': [
        {
          text: 'Shades Generator',
          link: '/sandbox/shades.md',
        },
        {
          text: 'Palette Generator',
          link: '/sandbox/palette.md',
        },
      ],
      '/doc/': [
        {
          text: 'Introduction',
          items: [
            { text: 'Overview', link: '/doc/overview.md' },
            { text: 'Why Palitra', link: '/doc/why-palitra.md' },
          ],
        },
        { text: 'Quick Start', link: '/doc/quick-start.md' },

        { text: 'Options', link: '/doc/options.md' },

        {
          text: 'Examples',
          items: [
            { text: 'Vivid', link: '/doc/vivid.md' },
            { text: 'Custom Palette', link: '/doc/custom-palette.md' },
          ],
        },
      ],
    },
    // [
    //   {
    //     text: 'Examples',

    //     items: [
    //       { text: 'Markdown Examples', link: '/markdown-examples' },
    //       { text: 'Runtime API Examples', link: '/api-examples' },
    //     ],
    //   },
    // ],

    socialLinks: [{ icon: 'github', link: 'https://github.com/prostojs/palitra' }],
  },
})
