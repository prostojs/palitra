# Custom Palette

```typescript
import { palitra } from '@prostojs/palitra'

const customPalette = palitra(
  {
    brand: '#6699cc',
    secondary: '#7d3f98',
    black: {
      color: '#000',
      // 20 shades of black (grey)
      count: 20,
      // overwriting default options
      luminance: {
        dark: 0,
        middle: 0.25,
        light: 0.5,
      },
      vivid: { dark: 0, light: 0 },
      saturate: {
        dark: 0,
        light: 0,
      },
      suffixes: 'abcdefghijklmnopqrstuvwxyz'.split(''),
    },
    // ...add more colors
  },
  // default options for the colors
  {
    count: 10,
    luminance: {
      dark: 0.27,
      middle: 0.62,
      light: 0.97,
    },
    vivid: {
      dark: 0.8,
      light: 0.7,
    },
    saturate: {
      dark: 0.1,
      light: 0.4,
    },
    // suffixes from darkest to lightest
    suffixes: ['900', '800', '700', '600', '500', '400', '300', '200', '100', '50'],
  }
)

console.log(customPalette)
```
