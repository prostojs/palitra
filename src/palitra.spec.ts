import { describe, expect, it } from 'vitest'

import { palitra } from './palitra'

describe('palitra', () => {
  it('must generate palitra', () => {
    expect(
      palitra({
        'blue': 'blue',
        'brand': {
          color: '#7552cc',
        },
        'yellow-vivid': {
          color: '#F0B429',
          luminance: {
            dark: 0.44,
            middle: 0.8,
            light: 0.99,
          },
          vivid: {
            dark: 0.9,
            light: 0.37,
          },
          saturate: {
            dark: 0,
            light: 1,
            slopes: {
              fromDark: 0.7,
              fromLight: 0.2,
            },
          },
        },
        'grey': {
          color: '#303030',
          count: 5,
          luminance: {
            dark: 0.1,
            middle: 0.3,
            light: 0.5,
          },
          suffixes: ['a', 'b', 'c', 'd', 'e'],
        },
      })
    ).toEqual({
      'blue': 'blue',
      'blue-050': '#f1f0ff',
      'blue-100': '#d7d5ff',
      'blue-200': '#bcbaff',
      'blue-300': '#a29fff',
      'blue-400': '#8684ff',
      'blue-500': '#6967ff',
      'blue-600': '#4645ff',
      'blue-700': '#0000ff',
      'blue-800': '#0000c7',
      'blue-900': '#000094',
      'brand': '#7552cc',
      'brand-050': '#f4f0fd',
      'brand-100': '#e0d4f7',
      'brand-200': '#cbb9f1',
      'brand-300': '#b69fe9',
      'brand-400': '#a186e0',
      'brand-500': '#8c6dd7',
      'brand-600': '#7552cc',
      'brand-700': '#5a31c2',
      'brand-800': '#42209c',
      'brand-900': '#2b1176',
      'grey': '#303030',
      'grey-a': '#040404',
      'grey-b': '#171717',
      'grey-c': '#303030',
      'grey-d': '#494949',
      'grey-e': '#636363',
      'yellow-vivid': '#F0B429',
      'yellow-vivid-050': '#fffcef',
      'yellow-vivid-100': '#ffefb9',
      'yellow-vivid-200': '#fde189',
      'yellow-vivid-300': '#fad365',
      'yellow-vivid-400': '#f6c444',
      'yellow-vivid-500': '#f0b429',
      'yellow-vivid-600': '#df8d10',
      'yellow-vivid-700': '#c86a0e',
      'yellow-vivid-800': '#ae490c',
      'yellow-vivid-900': '#8f2b0a',
    })
  })
})
