/* eslint-disable sonarjs/cognitive-complexity */
import { defu } from 'defu'

import type { TDetailedColorScale, TScaleOptions, TScaleOptionsInput } from './types'
import { color } from './utils/colors'
import { defaultOptions } from './utils/default-options'
import { shade } from './utils/shade'
import {
  adjustLumArray,
  clamp,
  getVividDist,
  interpolateArray,
  isDark,
  stitch,
  wrapHue,
} from './utils/utils'

export function scaleColor(input: string, _opts?: TScaleOptionsInput): TDetailedColorScale {
  const opts = defu(_opts, defaultOptions) as TScaleOptions
  const count = opts.count - 1
  const c = color(input)
  const [hue, sat] = c.hsl()
  const [, , , a] = c.rgba()

  const vivid = getVividDist(hue)
  const middle = Math.floor(count / 2)
  const optsMiddle = opts.luminance.useMiddle
    ? opts.luminance.middle
    : interpolateArray([0, count], [opts.luminance.dark, opts.luminance.light])[middle]

  const lumArray = stitch(
    middle,
    count,
    [opts.luminance.dark, optsMiddle],
    [optsMiddle, opts.luminance.light],
    opts.luminance.slopes
  )

  let closest = middle
  let adjustedLumArray = lumArray
  if (opts.preserveInputColor) {
    const [pbr] = c.oklab()
    const adjusted = adjustLumArray(lumArray, pbr)
    closest = adjusted.closest
    adjustedLumArray = adjusted.adjustedLumArray
  }

  const vividArray = stitch(
    closest,
    count,
    [vivid[0] * opts.vivid.dark, 0],
    [0, vivid[1] * opts.vivid.light],
    opts.vivid.slopes
  )
  const satArray = stitch(
    closest,
    count,
    [clamp(sat + opts.saturate.dark, 0, 1), sat],
    [sat, clamp(sat + opts.saturate.light, 0, 1)],
    opts.saturate.slopes
  )

  const arr: Array<{ color: string; isDark: boolean; pbr: number }> = []
  for (let i = 0; i < opts.count; i++) {
    const targetPbr = adjustedLumArray[i]
    let targetSat = satArray[i]
    const targetHue = wrapHue(hue + vividArray[i])
    if (Number.isNaN(targetHue)) {
      targetSat = 0
    }
    const { color: shadeColor, pbr } = shade(targetHue, targetSat, targetPbr)
    const [r, g, b] = shadeColor.rgb()
    const outColor = a < 255 ? color(r, g, b, a, 'rgb') : shadeColor
    arr.push({ color: outColor.hex(), pbr, isDark: isDark(pbr) })
  }
  return Object.assign(arr, { toStrings: () => arr.map(r => r.color) })
}
