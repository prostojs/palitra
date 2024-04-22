import { describe, expect, it } from 'vitest'

import { genShades } from './shades'

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
    expect(genShades('blue', opts)).toEqual([
      '#000097',
      '#0000cb',
      '#0101ff',
      '#4544ff',
      '#6765ff',
      '#8684ff',
      '#a3a0ff',
      '#bdbaff',
      '#d6d4ff',
      '#f1f0ff',
    ])
  })
})
