import { describe, expect, it } from 'vitest'
import { rgbToOklab } from './oklab'

describe('oklab', () => {
  it('must work', () => {
    let rgb: [number, number, number] = [10, 20, 30]
    expect(rgbToOklab(rgb)).toEqual([
      0.18698914444164635, -0.008946052782665415, -0.023703953261223792,
    ])
    rgb = [255, 12, 34]
    expect(rgbToOklab(rgb)).toEqual([0.6313560544986914, 0.22672002750940912, 0.1144537871222649])
    rgb = [200, 52, 154]
    expect(rgbToOklab(rgb)).toEqual([0.5824182817738833, 0.20008577232509273, -0.05977218822004754])
  })
})
