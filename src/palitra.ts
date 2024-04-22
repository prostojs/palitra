import { defu } from 'defu'

import { defaultOptions, defaultSuffixes } from './default-options'
import { genShades } from './shades'
import type { TPalitra, TPalitraInput, TPalitraOptions, TShadesOptionsInput } from './types'

export function palitra(p: TPalitraInput, _opts?: TShadesOptionsInput & TPalitraOptions): TPalitra {
  const opts = defu(_opts, defaultOptions, { suffixes: defaultSuffixes })
  const result: TPalitra = {}
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
    result[key] = color
    const shades = genShades(color, colOpts)
    for (const [i, shade] of shades.entries()) {
      let suffix = colOpts.suffixes[i]
      if (!suffix) {
        suffix = `--${i}`
      }
      result[[key, suffix].join('-')] = shade
    }
  }
  return result
}
