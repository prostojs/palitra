import { clamp } from './utils'

// Oklab <-> sRGB per https://bottosson.github.io/posts/oklab/

export function rgbToOklab(rgb: [number, number, number, number?]): [number, number, number] {
  const r = gammaToLinear(rgb[0] / 255)
  const g = gammaToLinear(rgb[1] / 255)
  const b = gammaToLinear(rgb[2] / 255)
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b)
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b)
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b)
  return [
    l * +0.2104542553 + m * +0.793617785 + s * -0.0040720468,
    l * +1.9779984951 + m * -2.428592205 + s * +0.4505937099,
    l * +0.0259040371 + m * +0.7827717662 + s * -0.808675766,
  ]
}

export function oklabToSRGB(L: number, a: number, _b: number): [number, number, number] {
  const l = (L + a * +0.3963377774 + _b * +0.2158037573) ** 3
  const m = (L + a * -0.1055613458 + _b * -0.0638541728) ** 3
  const s = (L + a * -0.0894841775 + _b * -1.291485548) ** 3
  const r = 255 * linearToGamma(l * +4.0767416621 + m * -3.3077115913 + s * +0.2309699292)
  const g = 255 * linearToGamma(l * -1.2684380046 + m * +2.6097574011 + s * -0.3413193965)
  const b = 255 * linearToGamma(l * -0.0041960863 + m * -0.7034186147 + s * +1.707614701)
  return [clamp(r, 0, 255), clamp(g, 0, 255), clamp(b, 0, 255)]
}

const gammaToLinear = (c: number) => (c >= 0.04045 ? ((c + 0.055) / 1.055) ** 2.4 : c / 12.92)
const linearToGamma = (c: number) => (c >= 0.0031308 ? 1.055 * c ** (1 / 2.4) - 0.055 : 12.92 * c)
