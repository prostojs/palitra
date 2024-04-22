import { describe, expect, it } from 'vitest'
import { rgbToOklab } from './oklab'
import chroma from 'chroma-js'

describe('oklab', () => {
  it('must work', () => {
    let rgb: [number, number, number] = [10, 20, 30]
    expect(rgbToOklab(rgb)).toEqual(chroma(...rgb, 'rgb').oklab())
    rgb = [255, 12, 34]
    expect(rgbToOklab(rgb)).toEqual(chroma(...rgb, 'rgb').oklab())
    rgb = [200, 52, 154]
    expect(rgbToOklab(rgb)).toEqual(chroma(...rgb, 'rgb').oklab())
  })
})
