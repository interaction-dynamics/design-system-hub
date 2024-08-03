/**
 * This is a credential token to access the design system
 */
export interface DesignSystemToken {
  /** not encrypted to identify the token*/
  prefix: string
  /** encrypted token */
  token: string
  description: string
  designSystemId: string
}
