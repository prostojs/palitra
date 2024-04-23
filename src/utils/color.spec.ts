import { describe, expect, it } from 'vitest'
import { color } from './colors'

describe('color utils', () => {
  it('must work with string color', () => {
    const c = color('#abcdef')
    expect(c.rgb()).toEqual([171, 205, 239])
    expect(c.hex()).toEqual(`#abcdef`)
    expect(c.oklab()).toEqual([0.8349788844515812, -0.021997083398780315, -0.055987166751314654])
    expect(c.hsl()).toEqual([210, 0.68, 0.803921568627451, 1])
  })
  it('must work with hsl color', () => {
    const c = color(250, 0.5, 0.4, 'hsl')
    expect(c.rgb()).toEqual([68, 51, 153])
    expect(c.hex()).toEqual('#443399')
    expect(c.oklab()).toEqual([0.40451012038464523, 0.03944143033579339, -0.15346082752874707])
    expect(c.hsl()).toEqual([250.00000000000003, 0.49999999999999994, 0.4, 1])
  })
  it('must work with oklab color', () => {
    const c = color(0.6, 0.5, 0.8, 'oklab')
    expect(c.rgb()).toEqual([255, 0, 0])
    expect(c.hex()).toEqual('#ff0000')
    expect(c.oklab()).toEqual([0.6279553606145516, 0.22486306106597398, 0.1258462985307351])
    expect(c.hsl()).toEqual([0, 1, 0.5, 1])
  })
  it('must work with grey hsl', () => {
    const c = color(Number.NaN, 0, 0.8, 'hsl')
    expect(c.rgb()).toEqual([204, 204, 204])
    expect(c.hex()).toEqual('#cccccc')
    expect(c.oklab()).toEqual([0.8452222502970194, 6.84230450076484e-11, 3.150473615320948e-8])
    expect(c.hsl()).toEqual([NaN, 0, 0.8, 1])
  })
  it('must work with opacity', () => {
    const c = color(250, 0.5, 0.4, 0.5, 'hsl')
    expect(c.rgb()).toEqual([68, 51, 153])
    expect(c.hex()).toEqual('#44339980')
    expect(c.oklab()).toEqual([0.40451012038464523, 0.03944143033579339, -0.15346082752874707])
    expect(c.hsl()).toEqual([250.00000000000003, 0.49999999999999994, 0.4, 0.5])
  })
})
