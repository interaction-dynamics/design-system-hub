import { capitalizeFirstLetter } from '@/lib/capitalize-first-letter'

export const cleanPageTitle = ({ filePath }: { filePath: string }) => {
  return capitalizeFirstLetter(
    filePath
      .replace(/^[0-9]+\-/, '')
      .replace(/-/g, ' ')
      .replace('.md', '')
  )
}
