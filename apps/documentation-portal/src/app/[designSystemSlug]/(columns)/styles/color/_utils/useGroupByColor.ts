import { Style } from '@/domain/entities/style'

export function useGroupByColor<T extends Style>(styles: T[]) {
  return styles.reduce((acc: Record<string, T[]>, style: T) => {
    const [prefix] = style.name.split('/')

    return {
      ...acc,
      [prefix]: [...(acc[prefix] || []), style].sort((a, b) =>
        a.name.localeCompare(b.name)
      ),
    }
  }, {})
}
