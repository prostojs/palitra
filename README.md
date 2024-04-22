# @prostojs/palitra

`@prostojs/palitra` is a powerful color manipulation library that generates perceptually uniform color shades based on the Oklab color model.

## Motivation

When I was working on the color scheme for my web project, I spent a lot of time flipping through design books and articles. Most of them seemed to agree on one thing: picking the right colors for a palette is more art than science. You pretty much have to trust your gut and "eyeball" each shade to make sure it looks right, which sounded super subjective and a bit hit-or-miss to me.

That got me thinking — could there be a more systematic way to do this? Why not challenge the status quo and see if there's a method to the madness? So, I started digging into different color palettes, looking for any patterns or rules that could be coded. That's how @prostojs/palitra was born.

This library is all about taking the guesswork out of making color palettes. It uses the Oklab color model to ensure the colors you pick are not only beautiful but look consistently good across different lighting and backgrounds. Plus, it has a cool feature that lets you amp up the vividness of colors, making your designs pop just the right amount. Think of it as a little bit of math magic to boost your creative flair!

## Features

- **Automating Shade Generation**: Automatically generates color shades from dark to light with visually equal perceptual steps.
- **Supporting Vivid Mode**: Enhances saturation and can adjust hues towards the nearest brighter or darker color at the edges of the shade array to increase color vividness.
- **Using Perceptual Uniformity**: Utilizes the Oklab color model to ensure colors are perceived uniformly in their brightness.
- **Colors with Suffixes**: Automatically generates palette with color names and suffixes like `blue-050`, `blue-100`, ..., `blue-900`.

## Installation

Install `@prostojs/palitra` using npm:

```bash
npm install @prostojs/palitra
```

Or using pnpm:

```bash
pnpm add @prostojs/palitra
```

## Usage

Below are examples of how to use the library to generate color palettes:

### Basic Palette Generation

Generate a basic palette for a single color:

```typescript
import { palitra } from '@prostojs/palitra'

const palette = palitra({
  'my-color': '#7552cc',
  'my-color2': '#00a0af',
  // ...
})

console.log(palette)
```

### Generating Vivid Shades

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

## Customization Options

Here’s a quick rundown of what you can tweak:

### Count

- **count**: Decide how many shades you want to generate. The default is 10 shades, giving you a nice range from dark to light.

### Luminance

- **luminance**: Control the brightness boundaries of your palette.
  - **dark**: Sets the brightness of your darkest shade.
  - **light**: Sets the brightness for the lightest shade.
  - **middle**: Sets the brightness level of your middle shade, typically the 5th color in a set of 10.
  - **slopes**: Adjust how the brightness transitions from dark to light.
    - **fromDark**: Controls the interpolation slope from the dark end. Lower values mean less variation among the darker shades, while higher values smooth out the mid-range.
    - **fromLight**: Similar to fromDark but for transitioning to the lighter shades. Higher values make the lightest shades more similar to each other.

### Vivid

- **vivid**: Adds a splash of vividness, especially useful at the color spectrum's edges.
  - **dark**: Controls how vivid the dark shades are by rotating the hue towards the darkest perceivable colors (up to 30 degrees).
  - **light**: Adjusts the vividness of the light shades by shifting the hue towards the brightest perceivable colors (also up to 30 degrees).
  - **slopes**: Manages how the hue shift is applied across the palette, similar to how slopes work in luminance.

### Saturate

- **saturate**: Enhances or reduces the saturation at the ends of your palette to make colors pop or blend more subtly.
  - **dark**: Increases saturation at the darker end.
  - **light**: Increases saturation at the lighter end.
  - **slopes**: Dictates how saturation changes from the dark end to the light end, allowing for smooth transitions or more abrupt changes.

These options are all optional. If you provide only a few properties, the rest will default to values that ensure a balanced and visually appealing palette. This flexibility allows you to experiment with different effects without having to specify every single parameter every time.

### Advanced Example Usage

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
    suffixes: ['900', '800', '700', '600', '500', '400', '300', '200', '100', '050'],
  }
)

console.log(customPalette)
```

## Contributing

Contributions are welcome! Please submit any bugs, issues, or suggestions through the GitHub issues page.
