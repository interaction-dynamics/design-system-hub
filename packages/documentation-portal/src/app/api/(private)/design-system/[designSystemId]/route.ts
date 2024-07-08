import { updateDesignSystem } from '@/adapters/data-access/design-systems'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { NextRequest } from 'next/server'
import z from 'zod'

const formSchema = z.object({
  name: z.string().min(2).optional(),
  slug: z.string().min(2).optional(),
  isPublic: z.boolean().optional(),
})

export async function PUT(
  request: NextRequest,
  { params }: { params: { designSystemId: string } }
) {
  const result = await request.json()

  try {
    formSchema.parse(result)

    await updateDesignSystem(params.designSystemId, result)

    return Response.json({ success: true })
  } catch (error: unknown) {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === 'P2002'
    ) {
      return Response.json({ success: false, reason: 'slug_duplicated' })
    }
    return Response.json({ success: false })
  }
}
