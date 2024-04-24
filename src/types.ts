export interface TScaleOptionsInput {
  count?: number
  preserveInputColor?: boolean
  luminance?: TScaleOption & {
    useMiddle?: boolean
    middle?: number
  }
  vivid?: TScaleOption
  saturate?: TScaleOption
}

export interface TScaleOptions {
  count: number
  preserveInputColor?: boolean
  luminance: Required<TScaleOption<Required<TShadeSlopes>>> & {
    useMiddle?: boolean
    middle: number
  }
  vivid: Required<TScaleOption<Required<TShadeSlopes>>>
  saturate: Required<TScaleOption<Required<TShadeSlopes>>>
}

interface TScaleOption<T = TShadeSlopes> {
  dark?: number
  light?: number
  slopes?: T
}

interface TShadeSlopes {
  fromDark?: number
  fromLight?: number
}

export type TPalitraInput = Record<string, TPalitraColor | undefined>

export type TPalitraColor<T = TScaleOptionsInput> =
  | string
  | (T & { color: string } & TPalitraOptions)

export interface TPalitraOptions {
  suffixes?: string[]
}

export type TColorScale = string[]
export type TDetailedColorScale = Array<{
  color: string
  isDark: boolean
  pbr: number
}> & { toStrings: () => TColorScale }

export type TPalitra = Record<string, string | undefined>
export type TDetailedPalitra = Record<
  string,
  (TDetailedColorScale[number] & { grp: string }) | undefined
> & { toStrings: () => TPalitra }
