import { Authentication } from '../domain/entities/authentication'
import { DesignSystem } from '../domain/entities/design-system'
import { Organization } from '../domain/entities/organization'

const API_URL = 'http://localhost:3000/api/'

export async function authenticate(email: string): Promise<Authentication> {
  const response = await fetch(`${API_URL}/cli/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  })

  const result = await response.json()

  const { token } = result as { token: string }

  return {
    token,
  }
}

export async function requestOrganizations(
  token: string,
): Promise<Array<Organization>> {
  const response = await fetch(`${API_URL}/organizations`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
  })

  if (response.status === 401) {
    throw new Error('Unauthorized')
  }

  const result = await response.json()

  const { organizations } = result as {
    organizations: Array<Organization>
  }

  return organizations
}

export async function requestDesignSystems(
  token: string,
  organizationId: string,
): Promise<Array<{ id: string; name: string }>> {
  const response = await fetch(
    `${API_URL}/organizations/${organizationId}/design-systems`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
    },
  )

  if (response.status === 401) {
    throw new Error('Unauthorized')
  }

  const result = await response.json()

  const { designSystems } = result as {
    designSystems: Array<{ id: string; name: string }>
  }

  return designSystems
}

export async function postDesignSystem(
  token: string,
  organizationId: string,
  designSystemId: string,
  designSystem: DesignSystem,
) {
  const response = await fetch(`${API_URL}/sync/code`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify({ organizationId, designSystemId, designSystem }),
  })

  if (response.status === 401) {
    throw new Error('Unauthorized')
  }

  const result = (await response.json()) as { success: boolean }

  return result?.success
}
