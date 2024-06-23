export type StyleType = 'color' | 'typography' | 'elevation' | 'spacing'

type Color = string

export interface ColorMetadata {
  color: Color
}

export interface TypographyMetadata {
  fontFamily: string
  fontSize: number
  fontWeight: number
  lineHeight: number | 'auto' // percentage
  letterSpacing: number // percentage
}

export interface ElevationMetadata {
  type: 'drop-shadow'
  color: Color
  offsetX: number
  offsetY: number
  blurRadius: number
  spreadRadius: number
}

export interface SpacingMetadata {
  spacing: number
}

interface IStyle<
  T = ColorMetadata | TypographyMetadata | ElevationMetadata | SpacingMetadata,
  S extends object = Record<string, any>,
> {
  id: string
  type: StyleType
  name: string
  metadata: T
  providers: S
}

export interface ColorStyle<S extends object = any>
  extends IStyle<ColorMetadata, S> {
  type: 'color'
}

export interface TypographyStyle<S extends object = any>
  extends IStyle<TypographyMetadata, S> {
  type: 'typography'
}

export interface ElevationStyle<S extends object = any>
  extends IStyle<ElevationMetadata, S> {
  type: 'elevation'
}

export interface SpacingStyle<S extends object = any>
  extends IStyle<SpacingMetadata, S> {
  type: 'spacing'
}

export type Style<S extends object = any> =
  | ColorStyle<S>
  | TypographyStyle<S>
  | ElevationStyle<S>
  | SpacingStyle<S>
