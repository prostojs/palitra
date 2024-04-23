import { describe, expect, it } from 'vitest'

import { scaleColor } from './scale-color'

const opts = {
  count: 10,
  luminance: {
    dark: 0.3,
    middle: 0.6,
    light: 0.96,
    slopes: {
      fromDark: 0.5,
      fromLight: 0.5,
    },
  },
  vivid: {
    dark: 0.1,
    light: 0.1,
    slopes: {
      fromDark: 0.6,
      fromLight: 0.6,
    },
  },
  saturate: {
    dark: 0.2,
    light: 0.2,
    slopes: {
      fromDark: 0.7,
      fromLight: 0.7,
    },
  },
}

describe('shades', () => {
  it('must generate shades', () => {
    expect(scaleColor('blue', opts)).toEqual([
      '#000094',
      '#0000c7',
      '#0000ff',
      '#4645ff',
      '#6967ff',
      '#8684ff',
      '#a29fff',
      '#bcbaff',
      '#d7d5ff',
      '#f1f0ff',
    ])
  })
  it('must work with alpha', () => {
    expect(scaleColor('#25fa5468', opts)).toEqual([
      '#00390b68',
      '#004f1068',
      '#01661668',
      '#017e1b68',
      '#02962168',
      '#03ae2768',
      '#04c72e68',
      '#05e13568',
      '#1ffa4f68',
      '#d2ffde68',
    ])
  })
})
