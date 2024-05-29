export type ComponentProviders<T> = Record<string, T>

export interface ComponentVariant<T = any> {
  name: string
  slug: string
  providers: ComponentProviders<T>
}
