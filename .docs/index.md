---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: '@prostojs/palitra'
  text: ''
  tagline: Generate perceptually uniform color shades based on the Oklab color space
  actions:
    - theme: brand
      text: Try Online
      link: /sandbox/shades.md
    - theme: alt
      text: Documentation
      link: /doc/quick-start.md

features:
  - title: Palette Generation
    details: Generate color shades from dark to light with visually equal perceptual steps
  - title: Vivid Mode
    details: Increase color vividness by adjusting hues towards the nearest brighter or darker color at the edges of the shades array
  - title: Embed in your code
    details: Add palette generation in your pipeline
---
