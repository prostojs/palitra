/* eslint-disable complexity */
/* eslint-disable unicorn/consistent-function-scoping */
/* eslint-disable max-params */
/* eslint-disable sonarjs/cognitive-complexity */
import { color } from './colors'
import { isCloseEnough } from './utils'

export function shade(h: number, s: number, targetPbr: number) {
  let l = 0.5
  const getColor = () => color(h, s, l, 'hsl')
  let current = getColor()
  let pbr = current.oklab()[0]
  for (const ll of [0.5, targetPbr > 0.5 ? 0.9 : 0.1]) {
    l = ll
    let i = 0
    let step = Math.abs(targetPbr - pbr) * 0.5
    while (!isCloseEnough(pbr, targetPbr) && i < 16) {
      i++
      if (pbr < targetPbr) {
        l += step
      } else {
        l -= step
      }
      current = getColor()
      const prevPbr = pbr
      pbr = current.oklab()[0]
      const dif = Math.abs(pbr - targetPbr)
      const pbrStep = Math.abs(pbr - prevPbr)
      step = pbrStep === 0 ? step * 2 : (step * dif) / pbrStep
      if (step < 0.0001) {
        step = 0.001
      }
    }
    if (!isCloseEnough(pbr, targetPbr)) {
      continue
    }
    break
  }
  return {
    color: current,
    pbr,
  }
}
