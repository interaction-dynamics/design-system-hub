import { findDesignSystemBySlug } from '@/adapters/data-access/design-systems'
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const slug = request.nextUrl.searchParams.get('slug')

  try {
    const designSystem = await findDesignSystemBySlug(slug ?? '')

    if (designSystem) {
      return Response.json({ unique: false })
    }
  } catch {
  } finally {
    return Response.json({ unique: true })
  }
}
