import { describe, expect, it } from 'vitest'
import chroma from 'chroma-js'
import { chromaMini } from './colors'

describe('color utils', () => {
  it('must work with string color', () => {
    const c = chromaMini('#abcdef')
    const cr = chroma('#abcdef')
    expect(c.rgb()).toEqual(cr.rgb())
    expect(c.hex()).toEqual(cr.hex())
    expect(c.oklab()).toEqual(cr.oklab())
    expect(c.hsl()).toEqual(cr.hsl())
  })
  it('must work with hsl color', () => {
    const c = chromaMini(250, 0.5, 0.4, 'hsl')
    const cr = chroma(250, 0.5, 0.4, 'hsl')
    expect(c.rgb()).toEqual(cr.rgb())
    expect(c.hex()).toEqual(cr.hex())
    expect(c.oklab()).toEqual(cr.oklab())
    expect(c.hsl()).toEqual(cr.hsl())
  })
  it('must work with oklab color', () => {
    const c = chromaMini(0.6, 0.5, 0.8, 'oklab')
    const cr = chroma(0.6, 0.5, 0.8, 'oklab')
    expect(c.rgb()).toEqual(cr.rgb())
    expect(c.hex()).toEqual(cr.hex())
    expect(c.oklab()).toEqual(cr.oklab())
    expect(c.hsl()).toEqual(cr.hsl())
  })
  it('must work with grey hsl', () => {
    const c = chromaMini(Number.NaN, 0, 0.8, 'hsl')
    const cr = chroma(Number.NaN, 0, 0.8, 'hsl')
    expect(c.rgb()).toEqual(cr.rgb())
    expect(c.hex()).toEqual(cr.hex())
    expect(c.oklab()).toEqual(cr.oklab())
    expect(c.hsl()).toEqual(cr.hsl())
  })
  it('must work with opacity', () => {
    const c = chromaMini(250, 0.5, 0.4, 0.5, 'hsl')
    const cr = chroma(250, 0.5, 0.4, 0.5, 'hsl')
    expect(c.rgb()).toEqual(cr.rgb())
    expect(c.hex()).toEqual(cr.hex())
    expect(c.oklab()).toEqual(cr.oklab())
    expect(c.hsl()).toEqual(cr.hsl())
  })
})
