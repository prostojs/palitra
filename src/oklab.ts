import { clamp } from './utils'

export function rgbToOklab(rgb: [number, number, number, number?]): [number, number, number] {
  // This is my undersanding: JavaScript canvas and many other virtual and literal devices use gamma-corrected (non-linear lightness) RGB, or sRGB. To convert sRGB values for manipulation in the Oklab color space, you must first convert them to linear RGB. Where Oklab interfaces with RGB it expects and returns linear RGB values. This next step converts (via a function) sRGB to linear RGB for Oklab to use:
  const r = gammaToLinear(rgb[0] / 255)
  const g = gammaToLinear(rgb[1] / 255)
  const b = gammaToLinear(rgb[2] / 255)
  // This is the Oklab math:
  let l = 0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b
  let m = 0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b
  let s = 0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b
  // Math.crb (cube root) here is the equivalent of the C++ cbrtf function here: https://bottosson.github.io/posts/oklab/#converting-from-linear-srgb-to-oklab
  l = Math.cbrt(l)
  m = Math.cbrt(m)
  s = Math.cbrt(s)
  return [
    l * +0.2104542553 + m * +0.793617785 + s * -0.0040720468,
    l * +1.9779984951 + m * -2.428592205 + s * +0.4505937099,
    l * +0.0259040371 + m * +0.7827717662 + s * -0.808675766,
  ]
}

export function oklabToSRGB(L: number, a: number, _b: number): [number, number, number] {
  let l = L + a * +0.3963377774 + _b * +0.2158037573
  let m = L + a * -0.1055613458 + _b * -0.0638541728
  let s = L + a * -0.0894841775 + _b * -1.291485548
  // The ** operator here cubes; same as l_*l_*l_ in the C++ example:
  l = l ** 3
  m = m ** 3
  s = s ** 3
  let r = l * +4.0767416621 + m * -3.3077115913 + s * +0.2309699292
  let g = l * -1.2684380046 + m * +2.6097574011 + s * -0.3413193965
  let b = l * -0.0041960863 + m * -0.7034186147 + s * +1.707614701
  // Convert linear RGB values returned from oklab math to sRGB for our use before returning them:
  r = 255 * linearToGamma(r)
  g = 255 * linearToGamma(g)
  b = 255 * linearToGamma(b)
  // OPTION: clamp r g and b values to the range 0-255; but if you use the values immediately to draw, JavaScript clamps them on use:
  r = clamp(r, 0, 255)
  g = clamp(g, 0, 255)
  b = clamp(b, 0, 255)
  return [r, g, b]
}

const gammaToLinear = (c: number) => (c >= 0.04045 ? ((c + 0.055) / 1.055) ** 2.4 : c / 12.92)
const linearToGamma = (c: number) => (c >= 0.0031308 ? 1.055 * c ** (1 / 2.4) - 0.055 : 12.92 * c)
