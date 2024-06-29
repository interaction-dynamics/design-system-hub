export interface DesignSystem<T = any> {
  id: string
  name: string
  slug: string
  providers: T
}
