import { Style } from '@/domain/entities/style'

export const byAlphabeticalOrder = (a: Style, b: Style) => {
  if (a.name < b.name) return -1
  if (a.name > b.name) return 1
  return 0
}
