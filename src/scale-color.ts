/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable sonarjs/cognitive-complexity */
import { defu } from 'defu'

import type { TDetailedColorScale, TScaleOptions, TScaleOptionsInput } from './types'
import { color } from './utils/colors'
import { defaultOptions } from './utils/default-options'
import { shade } from './utils/shade'
import { adjustLumArray, getVividDist, interpolateArray } from './utils/utils'

export function scaleColor(input: string, _opts?: TScaleOptionsInput): TDetailedColorScale {
  const opts = defu(_opts, defaultOptions) as TScaleOptions
  const count = opts.count - 1
  // if (!chroma.valid(input)) {
  //   return []
  // }
  const c = color(input)
  const [hue, sat, _l] = c.hsl() as unknown as [number, number, number, number]
  const [, , , a] = c.rgba()

  const vivid = getVividDist(hue)
  const middle = Math.floor(count / 2)
  const optsMiddle = opts.luminance.useMiddle
    ? opts.luminance.middle
    : interpolateArray([0, count], [opts.luminance.dark, opts.luminance.light])[middle]
  const lumArray = [
    ...interpolateArray(
      [0, middle],
      [opts.luminance.dark, optsMiddle],
      opts.luminance.slopes.fromDark
    ),
    ...interpolateArray(
      [middle, count],
      [optsMiddle, opts.luminance.light],
      1 - opts.luminance.slopes.fromLight
    ).slice(1),
  ]

  let closest = middle
  let adjustedLumArray = lumArray
  if (opts.preserveInputColor) {
    const [pbr] = c.oklab()
    const adjusted = adjustLumArray(lumArray, pbr)
    closest = adjusted.closest
    adjustedLumArray = adjusted.adjustedLumArray
  }
  const vividArray = [
    ...interpolateArray([0, closest], [vivid[0] * opts.vivid.dark, 0], opts.vivid.slopes.fromDark),
    ...interpolateArray(
      [closest, count],
      [0, vivid[1] * opts.vivid.light],
      1 - opts.vivid.slopes.fromLight
    ).slice(1),
  ]
  const satArray = [
    ...interpolateArray(
      [0, closest],
      [Math.max(0, Math.min(sat + opts.saturate.dark, 1)), sat],
      opts.saturate.slopes.fromDark
    ),
    ...interpolateArray(
      [closest, count],
      [sat, Math.max(0, Math.min(sat + opts.saturate.light, 1))],
      1 - opts.saturate.slopes.fromLight
    ).slice(1),
  ]
  const result: TDetailedColorScale = [] as unknown as TDetailedColorScale
  for (let i = 0; i < opts.count; i++) {
    const targetPbr = adjustedLumArray[i]
    let targetSat = satArray[i]
    let targetHue = hue + vividArray[i]
    if (targetHue >= 360) {
      targetHue = targetHue - 360
    }
    if (targetHue < 0) {
      targetHue = targetHue + 360
    }
    if (Number.isNaN(targetHue)) {
      targetSat = 0
    }
    const [r, g, b] = shade(targetHue, targetSat, targetPbr).color.rgb()
    const outColor = color(r, g, b, a, 'rgb')
    const pbr = outColor.oklab()[0]
    result.push({
      color: outColor.hex(),
      pbr,
      isDark: pbr < 0.72,
    })
  }
  result.toStrings = () => result.map(r => r.color)
  return result
}
