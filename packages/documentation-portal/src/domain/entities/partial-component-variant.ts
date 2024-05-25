export type PartialComponentProviders<T> = Record<string, T>

export interface PartialComponentVariant<T = any> {
  providers: PartialComponentProviders<T>
}
