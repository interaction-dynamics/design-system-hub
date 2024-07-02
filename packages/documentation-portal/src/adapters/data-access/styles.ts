import { Style } from '@/domain/entities/style'
import { db } from '@/lib/db'

export const deleteStyles = async (designSystemId: string) => {
  await db.style.deleteMany({
    where: { designSystemId },
  })
}

export const insertStyles = async (
  designSystemId: string,
  styles: Style<any>[]
) => {
  await db.style.createMany({
    data: styles.map(({ id, metadata, ...style }) => ({
      ...style,
      metadata: metadata as any,
      designSystemId,
    })),
  })
}

export const getStyles = async <T>(designSystemId: string, type: string) =>
  (await db.style.findMany({ where: { designSystemId, type } })) as Array<T>
