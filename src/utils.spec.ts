import { describe, expect, it } from 'vitest'

import { adjustLumArray, getVividDist, interpolateArray } from './utils'

describe('Lum Array Adjustment', () => {
  it('must adjust lum array to fit given brightness (left shift)', () => {
    expect(adjustLumArray([0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8], 0.54)).toEqual({
      adjustedLumArray: [
        0.24000000000000005, 0.34, 0.44000000000000006, 0.54, 0.64, 0.74, 0.8400000000000001,
      ],
      closest: 3,
    })
  })
  it('must adjust lum array to fit given brightness (right shift)', () => {
    expect(adjustLumArray([0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8], 0.57)).toEqual({
      adjustedLumArray: [
        0.16999999999999998, 0.26999999999999996, 0.37, 0.47, 0.57, 0.6699999999999999, 0.77,
      ],
      closest: 4,
    })
  })
  it('must avoid shifting below zero', () => {
    expect(adjustLumArray([0.1, 0.3, 0.5], 0.65)).toEqual({
      adjustedLumArray: [0.25, 0.45, 0.65],
      closest: 2,
    })
  })
  it('must avoid shifting above 1', () => {
    expect(adjustLumArray([0.4, 0.7, 0.9], 0.5)).toEqual({
      adjustedLumArray: [0.20000000000000007, 0.5, 0.7000000000000001],
      closest: 1,
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
