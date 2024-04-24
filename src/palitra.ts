/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable complexity */
import { defu } from 'defu'

import { scaleColor } from './scale-color'
import type {
  TDetailedPalitra,
  TPalitra,
  TPalitraInput,
  TPalitraOptions,
  TScaleOptionsInput,
} from './types'
import { color as colorFn } from './utils/colors'
import { defaultOptions, defaultSuffixes } from './utils/default-options'

export function palitra(
  p: TPalitraInput,
  _opts?: TScaleOptionsInput & TPalitraOptions
): TDetailedPalitra {
  const opts = defu(_opts, defaultOptions, { suffixes: defaultSuffixes })
  const result: TDetailedPalitra = {} as TDetailedPalitra
  for (const [key, val] of Object.entries(p)) {
    if (!val) {
      continue
    }
    let color: string
    let colOpts = opts
    if (typeof val === 'string') {
      color = val
    } else {
      color = val.color
      colOpts = defu(val, opts)
    }
    const shades = scaleColor(color, colOpts as TScaleOptionsInput)
    const middle = Math.floor(((colOpts.count || 10) - 1) / 2)
    for (const [i, shade] of shades.entries()) {
      let suffix = colOpts.suffixes[i]
      if (!suffix) {
        suffix = `--${i}`
      }
      result[[key, suffix].join('-')] = { ...shade, grp: key }
    }
    if (colOpts.preserveInputColor) {
      const pbr = colorFn(color).oklab()[0]
      result[key] = { color, grp: key, pbr, isDark: pbr < 0.72 }
    } else {
      result[key] = { ...shades[middle], grp: key }
    }
  }
  result.toStrings = () => {
    const obj: TPalitra = {}
    for (const [key, val] of Object.entries(result)) {
      if (val && typeof val !== 'function') {
        obj[key] = val.color
      }
    }
    return obj
  }
  return result
}
