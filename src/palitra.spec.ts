import { describe, expect, it } from 'vitest'

import { palitra } from './palitra'

describe('palitra', () => {
  it('must generate palitra', () => {
    expect(
      palitra({
        'blue': 'blue',
        'brand': {
          preserveInputColor: true,
          color: '#7552cc',
          luminance: {
            useMiddle: true,
          },
        },
        'yellow-vivid': {
          color: '#F0B429',
          preserveInputColor: true,
          luminance: {
            useMiddle: true,
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
          preserveInputColor: false,
          luminance: {
            useMiddle: false,
            dark: 0.1,
            light: 0.5,
          },
          suffixes: ['a', 'b', 'c', 'd', 'e'],
        },
      }).toStrings()
    ).toEqual({
      'blue': '#7f7fff',
      'blue-50': '#f1f0ff',
      'blue-100': '#dbd9ff',
      'blue-200': '#c5c3ff',
      'blue-300': '#afadff',
      'blue-400': '#9796ff',
      'blue-500': '#7f7fff',
      'blue-600': '#5656ff',
      'blue-700': '#1515ff',
      'blue-800': '#0000c2',
      'blue-900': '#00007f',
      'brand': '#7552cc',
      'brand-50': '#f4f0fd',

      'brand-100': '#e1d6f8',
      'brand-200': '#cebef2',
      'brand-300': '#bba6ea',
      'brand-400': '#a88fe2',
      'brand-500': '#9477da',
      'brand-600': '#7552cc',
      'brand-700': '#5730bc',
      'brand-800': '#3d1e91',
      'brand-900': '#250f65',
      'grey': '#2e2e2e',
      'grey-a': '#040404',
      'grey-b': '#161616',
      'grey-c': '#2e2e2e',
      'grey-d': '#484848',
      'grey-e': '#636363',
      'yellow-vivid': '#F0B429',
      'yellow-vivid-50': '#fffcef',
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
