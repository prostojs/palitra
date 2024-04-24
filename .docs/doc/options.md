# Options

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
