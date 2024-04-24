# Vivid

Generate a palette with vivid shades:

```typescript
import { palitra } from '@prostojs/palitra'

const vividPalette = palitra({
  'yellow-vivid': {
    color: '#f0b429',
    luminance: {
      dark: 0.43,
      middle: 0.8,
      light: 0.98,
    },
    vivid: {
      dark: 0.9,
      light: 0.37,
    },
    saturate: {
      dark: 0,
      light: 1,
      slopes: {
        fromDark: 0.7,
        fromLight: 0.2,
      },
    },
  },
})

console.log(vividPalette)
```
