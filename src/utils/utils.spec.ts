import { describe, expect, it } from 'vitest'

import { adjustLumArray, getVividDist, interpolateArray } from './utils'

describe('Lum Array Adjustment2', () => {
  it('must adjust lum array', () => {
    expect(adjustLumArray([0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8], 0.54)).toEqual({
      adjustedLumArray: [0.2, 0.31333, 0.42667, 0.54, 0.62667, 0.71333, 0.8],
      closest: 3,
    })
  })
  it('must adjust lum array on left end', () => {
    expect(adjustLumArray([0.2, 0.4, 0.6], 0.25)).toEqual({
      adjustedLumArray: [0.25, 0.425, 0.6],
      closest: 0,
    })
    expect(adjustLumArray([0.2, 0.4, 0.6], 0.15)).toEqual({
      adjustedLumArray: [0.15, 0.375, 0.6],
      closest: 0,
    })
  })
  it('must adjust lum array on right end', () => {
    expect(adjustLumArray([0.2, 0.4, 0.6], 0.55)).toEqual({
      adjustedLumArray: [0.2, 0.375, 0.55],
      closest: 2,
    })
    expect(adjustLumArray([0.2, 0.4, 0.6], 0.65)).toEqual({
      adjustedLumArray: [0.2, 0.425, 0.65],
      closest: 2,
    })
  })
})

describe('Vivid Distance', () => {
  it('must calculate distance to hue brightness max/min peaks', () => {
    expect(getVividDist(70)).toEqual([30, -10])
    expect(getVividDist(100)).toEqual([20, -30])
  })
})

describe('Interpolation', () => {
  it('must interpolate array linearly', () => {
    expect(interpolateArray([0, 8], [0.1, 0.9], 0.5)).toEqual([
      0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9,
    ])
  })
  it('must interpolate array non-linearly', () => {
    expect(interpolateArray([0, 8], [0.1, 0.9], 0.2)).toEqual([
      0.1, 0.14750000000000002, 0.21, 0.2875, 0.38, 0.48750000000000004, 0.61, 0.7475, 0.9,
    ])
  })
})
