import { Style } from '../entities/style'

export async function syncStyles(
  { designSystemId, styles }: { designSystemId: string; styles: Style[] },
  {
    insertStyles,
    deleteStyles,
  }: {
    insertStyles: (designSystemId: string, styles: Style[]) => Promise<void>
    deleteStyles: (designSystemId: string) => Promise<void>
  }
) {
  await deleteStyles(designSystemId)

  await insertStyles(designSystemId, styles)
}
