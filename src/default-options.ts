import type { TShadesOptions } from './types'

export const defaultOptions: TShadesOptions = {
  count: 10,
  luminance: {
    dark: 0.3,
    middle: 0.6,
    light: 0.96,
    slopes: {
      fromDark: 0.5,
      fromLight: 0.5,
    },
  },
  vivid: {
    dark: 0.1,
    light: 0.1,
    slopes: {
      fromDark: 0.6,
      fromLight: 0.6,
    },
  },
  saturate: {
    dark: 0.2,
    light: 0.2,
    slopes: {
      fromDark: 0.7,
      fromLight: 0.7,
    },
  },
}

export const defaultSuffixes = [
  '900',
  '800',
  '700',
  '600',
  '500',
  '400',
  '300',
  '200',
  '100',
  '050',
]
