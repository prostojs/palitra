export interface TShadesOptionsInput {
  count?: number
  luminance?: TShadesOption & {
    middle?: number
  }
  vivid?: TShadesOption
  saturate?: TShadesOption
}

export interface TShadesOptions {
  count: number
  luminance: Required<TShadesOption<Required<TShadeSlopes>>> & {
    middle: number
  }
  vivid: Required<TShadesOption<Required<TShadeSlopes>>>
  saturate: Required<TShadesOption<Required<TShadeSlopes>>>
}

interface TShadesOption<T = TShadeSlopes> {
  dark?: number
  light?: number
  slopes?: T
}

interface TShadeSlopes {
  fromDark?: number
  fromLight?: number
}

export type TPalitraInput = Record<string, TPalitraColor | undefined>

export type TPalitraColor = string | (TShadesOptionsInput & { color: string } & TPalitraOptions)

export interface TPalitraOptions {
  suffixes?: string[]
}

export type TPalitra = Record<string, string | undefined>
