import { describe, expect, it } from 'vite-plus/test'
import { shade } from './shade'
import { color } from './colors'

describe('shade', () => {
  it('must shade color to given brightness', () => {
    const c1 = prepareColor('#ab5421')
    const s1 = shade(c1.hsl[0], c1.hsl[1], c1.pbr)
    expect(s1.pbr).toEqual(c1.pbr)
    expect(s1.color.rgb()).toEqual(c1.color.rgb())
    const c2 = prepareColor('#225ff1')
    const s2 = shade(c2.hsl[0], c2.hsl[1], c2.pbr)
    expect(s2.pbr).toEqual(c2.pbr)
    expect(s2.color.rgb()).toEqual(c2.color.rgb())
    const c3 = prepareColor('blue')
    const s3 = shade(c3.hsl[0], c3.hsl[1], c3.pbr)
    expect(s3.pbr).toEqual(c3.pbr)
    expect(s3.color.rgb()).toEqual(c3.color.rgb())
    const c4 = prepareColor('yellow')
    const s4 = shade(c4.hsl[0], c4.hsl[1], c4.pbr)
    expect(Math.round(s4.pbr * 100) / 100).toEqual(Math.round(c4.pbr * 100) / 100)
    expect(s4.color.rgb()).toEqual(c4.color.rgb())
    const c5 = prepareColor('#00a4e4')
    const s5 = shade(c5.hsl[0], c5.hsl[1], c5.pbr)
    expect(s5.pbr).toEqual(c5.pbr)
    expect(s5.color.rgb()).toEqual(c5.color.rgb())
  })

  it('test', () => {
    expect(color(255, 255, 0, 'rgb').rgb()).toEqual(color(60, 1, 0.5, 'hsl').rgb())
    expect(color(255, 255, 0, 'rgb').oklab()).toEqual(color(60, 1, 0.5, 'hsl').oklab())
  })

  describe('flatness', () => {
    // Yellow hue: HSL l=0.5 yields Oklab L near 0.97, so the solver must push l
    // far from targetPbr — giving a wide gap between "raw" and "solved" l for
    // the blend tests to land meaningfully between.
    const h = 60
    const s = 1
    const targetPbr = 0.5

    it('flatness=1 matches default behavior and hits target Oklab L', () => {
      const sDefault = shade(h, s, targetPbr)
      const sOne = shade(h, s, targetPbr, 1)
      expect(sOne.color.rgb()).toEqual(sDefault.color.rgb())
      expect(Math.abs(sOne.pbr - targetPbr)).toBeLessThan(0.005)
    })

    it('flatness=0 skips normalization: HSL l equals target', () => {
      const s0 = shade(h, s, targetPbr, 0)
      const l = s0.color.hsl()[2]
      expect(Math.abs(l - targetPbr)).toBeLessThan(0.005)
    })

    it('flatness=0.5 blends between raw and solved', () => {
      const lFlat = shade(h, s, targetPbr, 1).color.hsl()[2]
      const lRaw = shade(h, s, targetPbr, 0).color.hsl()[2]
      const lMid = shade(h, s, targetPbr, 0.5).color.hsl()[2]
      const low = Math.min(lFlat, lRaw)
      const high = Math.max(lFlat, lRaw)
      expect(lMid).toBeGreaterThan(low)
      expect(lMid).toBeLessThan(high)
      expect(Math.abs(lMid - (lRaw + lFlat) / 2)).toBeLessThan(0.005)
    })
  })
})

function prepareColor(input: string) {
  const c = color(input)
  const pbr = c.oklab()[0]
  const hsl = c.hsl()
  hsl[2] = Math.round(hsl[2] * 100) / 100
  return {
    pbr,
    hsl: c.hsl(),
    color: c,
  }
}
