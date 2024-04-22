/* eslint-disable complexity */
/* eslint-disable max-params */
/* eslint-disable no-param-reassign */
export function isCloseEnough(a: number, b: number, sigma = 0.005) {
  return Math.abs(a - b) <= sigma
}

export function adjustLumArray(lumArray: number[], pbr: number) {
  let minDif = 1
  let closest = 0
  let minus = false
  let max = lumArray[0]
  let min = lumArray[0]
  for (const [i, element] of lumArray.entries()) {
    if (element > max) {
      max = element
    }
    if (element < min) {
      min = element
    }
    const dif = Math.abs(element - pbr)
    if (dif < minDif) {
      minDif = dif
      minus = element - pbr > 0
      closest = i
    }
  }
  let newLumArray: number[] = []
  if (minus) {
    if (min - minDif > 0) {
      newLumArray = lumArray.map(l => l - minDif)
    } else {
      closest--
      minDif = Math.abs(lumArray[closest] - pbr)
      newLumArray = lumArray.map(l => l + minDif)
    }
  } else if (max + minDif < 1) {
    newLumArray = lumArray.map(l => l + minDif)
  } else {
    closest++
    minDif = Math.abs(lumArray[closest] - pbr)
    newLumArray = lumArray.map(l => l - minDif)
  }
  return {
    closest,
    adjustedLumArray: newLumArray,
  }
}

export function getVividDist(hue: number, limit = 30) {
  if (Number.isNaN(hue)) {
    return [0, 0]
  }
  const MAX_B = [0, 120, 240, 360]
  const MIN_B = [60, 180, 300, 420]
  const closestMax = MAX_B[Math.round(hue / 120)]
  const closestMin = MIN_B[Math.round((hue - 60) / 120)]
  const maxDist = closestMax - hue
  const minDist = closestMin - hue
  return [
    maxDist === 0 ? 0 : (Math.abs(maxDist) / maxDist) * Math.min(Math.abs(maxDist), limit),
    minDist === 0 ? 0 : (Math.abs(minDist) / minDist) * Math.min(Math.abs(minDist), limit),
  ]
}

export function interpolateArray(
  borders: [number, number],
  target: [number, number],
  slope?: number
) {
  const a: number[] = []
  for (let i = borders[0]; i <= borders[1]; i++) {
    a.push(interpolate(i, borders, target, slope))
  }
  return a
}

const b1 = (t: number) => t * t
const b2 = (t: number) => 2 * t * (1 - t)
const b3 = (t: number) => (1 - t) * (1 - t)

export function interpolate(
  index: number,
  borders: [number, number],
  target: [number, number],
  slope = 0.5
) {
  const [s1, s2] = borders
  const [t1, t2] = target
  if (index < Math.min(s1, s2)) {
    return Math.min(s1, s2) === s1 ? t1 : t2
  }

  if (index > Math.max(s1, s2)) {
    return Math.max(s1, s2) === s1 ? t1 : t2
  }

  index = s2 - index

  const C1 = { x: s1, y: t1 }
  const C3 = { x: s2, y: t2 }
  const C2 = {
    y: C1.y + Math.abs(slope) * (C3.y - C1.y),
  }

  const percent = index / (C3.x - C1.x)

  return C1.y * b1(percent) + C2.y * b2(percent) + C3.y * b3(percent)
}

export function clamp(value: number, min: number, max: number) {
  return Math.max(Math.min(value, max), min)
}
