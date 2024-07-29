import { NextRequest } from 'next/server'
import { Organization } from '../../../../domain/entities/organization'
import { getUser } from '../../_utils/get-user'

export async function GET(request: NextRequest) {
  const user = await getUser(request)

  if (!user) {
    return Response.json({ error: 'Forbidden' }, { status: 401 })
  }

  const organizations: Organization[] = [
    {
      id: '1',
      name: 'Organization 1',
      slug: 'test',
    },
  ]

  return Response.json({
    organizations,
  })
}
