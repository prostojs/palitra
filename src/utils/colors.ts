/* eslint-disable max-params */
/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable no-param-reassign */

import { oklabToSRGB, rgbToOklab } from './oklab'
import { clamp } from './utils'

/* eslint-disable complexity */
const constColors = {
  aliceblue: 'f0f8ff',
  antiquewhite: 'faebd7',
  aqua: '0ff',
  aquamarine: '7fffd4',
  azure: 'f0ffff',
  beige: 'f5f5dc',
  bisque: 'ffe4c4',
  black: '000',
  blanchedalmond: 'ffebcd',
  blue: '00f',
  blueviolet: '8a2be2',
  brown: 'a52a2a',
  burlywood: 'deb887',
  burntsienna: 'ea7e5d',
  cadetblue: '5f9ea0',
  chartreuse: '7fff00',
  chocolate: 'd2691e',
  coral: 'ff7f50',
  cornflowerblue: '6495ed',
  cornsilk: 'fff8dc',
  crimson: 'dc143c',
  cyan: '0ff',
  darkblue: '00008b',
  darkcyan: '008b8b',
  darkgoldenrod: 'b8860b',
  darkgray: 'a9a9a9',
  darkgreen: '006400',
  darkgrey: 'a9a9a9',
  darkkhaki: 'bdb76b',
  darkmagenta: '8b008b',
  darkolivegreen: '556b2f',
  darkorange: 'ff8c00',
  darkorchid: '9932cc',
  darkred: '8b0000',
  darksalmon: 'e9967a',
  darkseagreen: '8fbc8f',
  darkslateblue: '483d8b',
  darkslategray: '2f4f4f',
  darkslategrey: '2f4f4f',
  darkturquoise: '00ced1',
  darkviolet: '9400d3',
  deeppink: 'ff1493',
  deepskyblue: '00bfff',
  dimgray: '696969',
  dimgrey: '696969',
  dodgerblue: '1e90ff',
  firebrick: 'b22222',
  floralwhite: 'fffaf0',
  forestgreen: '228b22',
  fuchsia: 'f0f',
  gainsboro: 'dcdcdc',
  ghostwhite: 'f8f8ff',
  gold: 'ffd700',
  goldenrod: 'daa520',
  gray: '808080',
  green: '008000',
  greenyellow: 'adff2f',
  grey: '808080',
  honeydew: 'f0fff0',
  hotpink: 'ff69b4',
  indianred: 'cd5c5c',
  indigo: '4b0082',
  ivory: 'fffff0',
  khaki: 'f0e68c',
  lavender: 'e6e6fa',
  lavenderblush: 'fff0f5',
  lawngreen: '7cfc00',
  lemonchiffon: 'fffacd',
  lightblue: 'add8e6',
  lightcoral: 'f08080',
  lightcyan: 'e0ffff',
  lightgoldenrodyellow: 'fafad2',
  lightgray: 'd3d3d3',
  lightgreen: '90ee90',
  lightgrey: 'd3d3d3',
  lightpink: 'ffb6c1',
  lightsalmon: 'ffa07a',
  lightseagreen: '20b2aa',
  lightskyblue: '87cefa',
  lightslategray: '789',
  lightslategrey: '789',
  lightsteelblue: 'b0c4de',
  lightyellow: 'ffffe0',
  lime: '0f0',
  limegreen: '32cd32',
  linen: 'faf0e6',
  magenta: 'f0f',
  maroon: '800000',
  mediumaquamarine: '66cdaa',
  mediumblue: '0000cd',
  mediumorchid: 'ba55d3',
  mediumpurple: '9370db',
  mediumseagreen: '3cb371',
  mediumslateblue: '7b68ee',
  mediumspringgreen: '00fa9a',
  mediumturquoise: '48d1cc',
  mediumvioletred: 'c71585',
  midnightblue: '191970',
  mintcream: 'f5fffa',
  mistyrose: 'ffe4e1',
  moccasin: 'ffe4b5',
  navajowhite: 'ffdead',
  navy: '000080',
  oldlace: 'fdf5e6',
  olive: '808000',
  olivedrab: '6b8e23',
  orange: 'ffa500',
  orangered: 'ff4500',
  orchid: 'da70d6',
  palegoldenrod: 'eee8aa',
  palegreen: '98fb98',
  paleturquoise: 'afeeee',
  palevioletred: 'db7093',
  papayawhip: 'ffefd5',
  peachpuff: 'ffdab9',
  peru: 'cd853f',
  pink: 'ffc0cb',
  plum: 'dda0dd',
  powderblue: 'b0e0e6',
  purple: '800080',
  rebeccapurple: '663399',
  red: 'f00',
  rosybrown: 'bc8f8f',
  royalblue: '4169e1',
  saddlebrown: '8b4513',
  salmon: 'fa8072',
  sandybrown: 'f4a460',
  seagreen: '2e8b57',
  seashell: 'fff5ee',
  sienna: 'a0522d',
  silver: 'c0c0c0',
  skyblue: '87ceeb',
  slateblue: '6a5acd',
  slategray: '708090',
  slategrey: '708090',
  snow: 'fffafa',
  springgreen: '00ff7f',
  steelblue: '4682b4',
  tan: 'd2b48c',
  teal: '008080',
  thistle: 'd8bfd8',
  tomato: 'ff6347',
  turquoise: '40e0d0',
  violet: 'ee82ee',
  wheat: 'f5deb3',
  white: 'fff',
  whitesmoke: 'f5f5f5',
  yellow: 'ff0',
  yellowgreen: '9acd32',
}

export function fromHsl(
  h: number,
  s: number,
  l: number,
  a?: number
): [number, number, number, number] {
  return hslToRgb(
    h,
    clamp(s, 0, 1) * 100,
    clamp(l, 0, 1) * 100,
    clamp(typeof a === 'number' ? a : 1, 0, 1) * 100
  )
}

export function toRgb(input: string): [number, number, number, number] | undefined {
  if (constColors[input as 'blue']) {
    input = `#${constColors[input as 'blue']}`
  }
  const hexRegex = /^#(?:[\dA-Fa-f]{3}){1,2}(?:[\dA-Fa-f]{2})?$/
  const rgbRegex = /^rgba?\((\d+),\s*(\d+),\s*(\d+)(,\s*\d+)?\)$/
  const hslRegex = /^hsla?\((\d+),\s*(\d+)%,\s*(\d+)%(,\s*\d+)?\)$/

  if (hexRegex.test(input)) {
    return hexToRgb(input)
  }

  const rgbMatch = input.match(rgbRegex)
  if (rgbMatch) {
    const r = Number.parseInt(rgbMatch[1], 10)
    const g = Number.parseInt(rgbMatch[2], 10)
    const b = Number.parseInt(rgbMatch[3], 10)
    const a = rgbMatch[4] ? Number.parseInt(rgbMatch[4], 10) : 255
    return [r, g, b, a]
  }

  const hslMatch = input.match(hslRegex)
  if (hslMatch) {
    const h = Number.parseInt(hslMatch[1], 10)
    const s = Number.parseInt(hslMatch[2], 10)
    const l = Number.parseInt(hslMatch[3], 10)
    const a = hslMatch[4] ? Number.parseInt(hslMatch[4], 10) : 100
    return hslToRgb(h, s, l, a)
  }
}

function hexToRgb(hex: string): [number, number, number, number] {
  hex = hex.replace(/^#/, '')

  let r: number
  let g: number
  let b: number
  let a = 255

  switch (hex.length) {
    case 3: {
      r = Number.parseInt(hex.charAt(0) + hex.charAt(0), 16)
      g = Number.parseInt(hex.charAt(1) + hex.charAt(1), 16)
      b = Number.parseInt(hex.charAt(2) + hex.charAt(2), 16)
      break
    }
    case 4: {
      r = Number.parseInt(hex.charAt(0) + hex.charAt(0), 16)
      g = Number.parseInt(hex.charAt(1) + hex.charAt(1), 16)
      b = Number.parseInt(hex.charAt(2) + hex.charAt(2), 16)
      a = Number.parseInt(hex.charAt(3) + hex.charAt(3), 16)
      break
    }
    case 6: {
      r = Number.parseInt(hex.slice(0, 2), 16)
      g = Number.parseInt(hex.slice(2, 4), 16)
      b = Number.parseInt(hex.slice(4, 6), 16)
      break
    }
    case 8: {
      r = Number.parseInt(hex.slice(0, 2), 16)
      g = Number.parseInt(hex.slice(2, 4), 16)
      b = Number.parseInt(hex.slice(4, 6), 16)
      a = Number.parseInt(hex.slice(6, 8), 16)
      break
    }
    default: {
      throw new Error('Invalid HEX color format')
    }
  }

  return [r, g, b, a]
}

function rgbToHex(rgb: [number, number, number, number?]): string {
  // eslint-disable-next-line unicorn/consistent-function-scoping
  const toHex = (c: number): string => {
    const hex = c.toString(16)
    return hex.length === 1 ? `0${hex}` : hex
  }

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return `#${toHex(rgb[0])}${toHex(rgb[1])}${toHex(rgb[2])}${rgb[3]! < 255 ? toHex(rgb[3]!) : ''}`
}

export function hslToRgb(
  h: number | null,
  s: number,
  l: number,
  a?: number
): [number, number, number, number] {
  s /= 100
  l /= 100
  if (typeof a === 'number') {
    a /= 100
  } else {
    a = 1
  }
  if (h === null || Number.isNaN(h)) {
    const gray = Math.round(l * 255)
    return [gray, gray, gray, Math.round(a * 255)]
  }
  if (h >= 360) {
    h = h - 360
  }

  const c = (1 - Math.abs(2 * l - 1)) * s
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1))
  const m = l - c / 2

  let r = 0
  let g = 0
  let b = 0
  if (h >= 0 && h < 60) {
    r = c
    g = x
    b = 0
  } else if (h >= 60 && h < 120) {
    r = x
    g = c
    b = 0
  } else if (h >= 120 && h < 180) {
    r = 0
    g = c
    b = x
  } else if (h >= 180 && h < 240) {
    r = 0
    g = x
    b = c
  } else if (h >= 240 && h < 300) {
    r = x
    g = 0
    b = c
  } else if (h >= 300 && h < 360) {
    r = c
    g = 0
    b = x
  }

  return [
    Math.round((r + m) * 255),
    Math.round((g + m) * 255),
    Math.round((b + m) * 255),
    Math.round(a * 255),
  ] as [number, number, number, number]
}

export function rgbToHsl(rgb: [number, number, number, number?]): [number, number, number, number] {
  const r = rgb[0] / 255
  const g = rgb[1] / 255
  const b = rgb[2] / 255
  const a = typeof rgb[3] === 'number' ? rgb[3] / 255 : 1

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)

  let h = 0
  let s = 0
  const l = (max + min) / 2

  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r: {
        h = (g - b) / d + (g < b ? 6 : 0)
        break
      }
      case g: {
        h = (b - r) / d + 2
        break
      }
      case b: {
        h = (r - g) / d + 4
        break
      }
    }
    h /= 6
  }

  return [r === g && g === b ? Number.NaN : h * 360, s, l, Math.round(a * 100) / 100]
}

export function color(
  ...args:
    | [string]
    | [number, number, number, 'hsl' | 'oklab' | 'rgb']
    | [number, number, number, number, 'hsl' | 'rgb']
): TColor {
  const c = args[0]
  let rgb: [number, number, number, number] | undefined
  if (typeof c === 'string') {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    rgb = toRgb(c)!
  } else if (
    typeof args[0] === 'number' &&
    typeof args[1] === 'number' &&
    typeof args[2] === 'number'
  ) {
    const type = args[args.length - 1]
    // eslint-disable-next-line @typescript-eslint/switch-exhaustiveness-check
    switch (type) {
      case 'hsl': {
        rgb = fromHsl(args[0], args[1], args[2], typeof args[3] === 'number' ? args[3] : undefined)
        break
      }
      case 'oklab': {
        rgb = [...oklabToSRGB(args[0], args[1], args[2]), 255]
        break
      }
      case 'rgb': {
        rgb = [args[0], args[1], args[2], typeof args[3] === 'number' ? args[3] : 255]
        break
      }
    }
  }

  if (!rgb) {
    throw new Error(`Not supported color "${args.join(', ')}"`)
  }
  return {
    rgb: () => rgb.slice(0, 3) as [number, number, number],
    rgba: () => rgb,
    hex: () => rgbToHex(rgb),
    oklab: () => rgbToOklab(rgb),
    hsl: () => rgbToHsl(rgb),
  }
}

interface TColor {
  rgb: () => [number, number, number]
  rgba: () => [number, number, number, number]
  hex: () => string
  oklab: () => [number, number, number]
  hsl: () => [number, number, number, number]
}
