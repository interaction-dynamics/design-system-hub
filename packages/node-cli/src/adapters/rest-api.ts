import { DesignSystem } from '../domain/entities/design-system'
import { Organization } from '../domain/entities/organization'

const API_URL =
  process.env.DSHUB_HOST ?? 'https://beta.design-system-hub.com/api'

export async function postLogin(token: string): Promise<{ success: boolean }> {
  const response = await fetch(`${API_URL}/cli/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token }),
  })

  const result = await response.json()

  return result as { success: boolean }
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
  designSystem: DesignSystem,
) {
  const response = await fetch(`${API_URL}/code/sync`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify({ designSystem }),
  })

  if (response.status === 401) {
    throw new Error('Unauthorized')
  }

  const result = (await response.json()) as { success: boolean }

  return result?.success
}

export async function fetchDesignTokens({ token }: { token: string }) {
  const response = await fetch(`${API_URL}/design-token`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
  })

  if (response.status === 401) {
    throw new Error('Unauthorized')
  }

  const result = (await response.json()) as {
    success: boolean
    tokens: Record<string, unknown>
  }

  return result?.tokens
}
