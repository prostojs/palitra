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
            dark: 0.43,
            middle: 0.8,
            light: 0.98,
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
    ).toMatchInlineSnapshot(`
      {
        "blue": "blue",
        "blue-050": "#f1f0ff",
        "blue-100": "#d6d4ff",
        "blue-200": "#bdbaff",
        "blue-300": "#a3a0ff",
        "blue-400": "#8684ff",
        "blue-500": "#6765ff",
        "blue-600": "#4544ff",
        "blue-700": "#0101ff",
        "blue-800": "#0000cb",
        "blue-900": "#000097",
        "brand": "#7552cc",
        "brand-050": "#f8f5fe",
        "brand-100": "#e3d8f8",
        "brand-200": "#cebdf2",
        "brand-300": "#b9a3ea",
        "brand-400": "#a389e1",
        "brand-500": "#8d6ed7",
        "brand-600": "#7552cc",
        "brand-700": "#5b32c5",
        "brand-800": "#4421a3",
        "brand-900": "#2e127c",
        "grey": "#303030",
        "grey-a": "#040404",
        "grey-b": "#181818",
        "grey-c": "#303030",
        "grey-d": "#4a4a4a",
        "grey-e": "#666666",
        "yellow-vivid": "#F0B429",
        "yellow-vivid-050": "#fffae4",
        "yellow-vivid-100": "#ffefb6",
        "yellow-vivid-200": "#fde18a",
        "yellow-vivid-300": "#fad262",
        "yellow-vivid-400": "#f6c549",
        "yellow-vivid-500": "#f0b428",
        "yellow-vivid-600": "#de8c10",
        "yellow-vivid-700": "#c76a0e",
        "yellow-vivid-800": "#ad490c",
        "yellow-vivid-900": "#8e2b0a",
      }
    `)
  })
})
