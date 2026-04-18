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
import { isDark } from './utils/utils'

export function palitra(
  p: TPalitraInput,
  _opts?: TScaleOptionsInput & TPalitraOptions
): TDetailedPalitra {
  const opts = defu(_opts, defaultOptions, { suffixes: defaultSuffixes })
  const result = {} as TDetailedPalitra
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
    for (const [i, shade] of shades.entries()) {
      const suffix = colOpts.suffixes[i] ?? `--${i}`
      result[[key, suffix].join('-')] = { ...shade, grp: key }
    }
    if (colOpts.preserveInputColor) {
      const pbr = colorFn(color).oklab()[0]
      result[key] = { color, grp: key, pbr, isDark: isDark(pbr) }
    } else {
      const middle = Math.floor((colOpts.count - 1) / 2)
      result[key] = { ...shades[middle], grp: key }
    }
  }
  return Object.assign(result, {
    toStrings: () => {
      const obj: TPalitra = {}
      for (const [key, val] of Object.entries(result)) {
        if (val && typeof val !== 'function') {
          obj[key] = val.color
        }
      }
      return obj
    },
  })
}
