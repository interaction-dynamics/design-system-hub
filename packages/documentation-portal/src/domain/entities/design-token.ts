/**
 *
 * @see https://second-editors-draft.tr.designtokens.org/format/
 */

type JsonValue =
  | string
  | number
  | boolean
  | object
  | Array<JsonValue>
  | boolean
  | null

type JsonTypes = 'string' | 'number' | 'object' | 'array' | 'boolean' | 'null'

export type DesignTokenType =
  | JsonTypes
  | 'color'
  | 'duration'
  | 'size'
  | 'dimension'
  | 'fontFamily'
  | 'fontWeight'
  | 'cubicBezier'

export interface DesignToken {
  $value: string | number | boolean
  $type?: DesignTokenType
  $metadata?: any
  $descritpion?: string
}
