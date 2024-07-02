import { updateDesignSystem } from '@/adapters/data-access/design-systems'
import { NextRequest } from 'next/server'
import z from 'zod'

const formSchema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2),
  isPublic: z.boolean(),
})

export async function PUT(
  request: NextRequest,
  { params }: { params: { designSystemId: string } }
) {
  const result = await request.json()

  try {
    formSchema.parse(result)

    const { name, slug, isPublic } = result

    await updateDesignSystem(params.designSystemId, result)

    return Response.json({ success: true })
  } catch (error) {
    console.error(error)
    return Response.json({ success: false })
  }
}
