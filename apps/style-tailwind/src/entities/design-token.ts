export interface DesignToken {
  [key: string]: DesignToken | string | { $value: string }
}

export interface AllDesignTokens {
  [key: string]: DesignToken & { $type: string }
}
