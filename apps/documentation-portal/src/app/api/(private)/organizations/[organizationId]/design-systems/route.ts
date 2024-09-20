import { findAllDesignSystemsByOrganizationId } from '@/adapters/data-access/design-systems'
import { getUser } from '../../../../_utils/get-user'
import { NextRequest } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: { organizationId: string } }
) {
  const user = await getUser(request)

  if (!user) {
    return Response.json({ error: 'Forbidden' }, { status: 401 })
  }

  const designSystems = await findAllDesignSystemsByOrganizationId(
    params.organizationId
  )

  return Response.json({ designSystems })
}
