/* eslint-disable sonarjs/cognitive-complexity */
import chroma from 'chroma-js'
import { defu } from 'defu'

import { defaultOptions } from './default-options'
import type { TShadesOptions, TShadesOptionsInput } from './types'
import { adjustLumArray, getVividDist, interpolateArray, isCloseEnough } from './utils'

export function genShades(color: string, _opts?: TShadesOptionsInput) {
  const opts = defu(_opts, defaultOptions) as TShadesOptions
  const count = opts.count - 1
  if (!chroma.valid(color)) {
    return []
  }
  const c = chroma(color)
  const [hue, sat, _l, a] = c.hsl() as unknown as [number, number, number, number]
  const [pbr] = c.oklab()

  const vivid = getVividDist(hue)
  const middle = Math.floor(count / 2)
  const lumArray = [
    ...interpolateArray(
      [0, middle],
      [opts.luminance.dark, opts.luminance.middle],
      opts.luminance.slopes.fromDark
    ),
    ...interpolateArray(
      [middle, count],
      [opts.luminance.middle, opts.luminance.light],
      1 - opts.luminance.slopes.fromLight
    ).slice(1),
  ]
  const { adjustedLumArray, closest } = adjustLumArray(lumArray, pbr)
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
  const result: string[] = []
  for (let i = 0; i < opts.count; i++) {
    const targetPbr = adjustedLumArray[i]
    const targetSat = satArray[i]
    let targetHue = hue + vividArray[i]
    if (targetHue >= 360) {
      targetHue = targetHue - 360
    }
    if (targetHue < 0) {
      targetHue = targetHue + 360
    }
    const newOklab = chroma(targetHue, targetSat, targetPbr, 'hsl').oklab()
    newOklab[0] = targetPbr
    let l = chroma(...newOklab, 'oklab').hsl()[2]
    let newShade = chroma(targetHue, targetSat, l, 'hsl')
    let newPbr = newShade.oklab()[0]
    let step = 0.2
    let j = 0
    while (!isCloseEnough(newPbr, targetPbr)) {
      j++
      l = newPbr > targetPbr ? l - step : l + step
      newShade = chroma(targetHue, targetSat, l, 'hsl')
      newPbr = newShade.oklab()[0]
      if (step > 0.003) {
        step = step / 2
      }
      if (j > 100) {
        break
      }
    }
    result.push(chroma(targetHue, targetSat, l, a, 'hsl').hex())
  }
  return result
}
