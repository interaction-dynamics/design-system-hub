import { FigmaDesignSystemCredentials } from '../../types/figma-design-system-credentials'

export async function generateAccessToken(
  callbackUrl: string,
  code: string
): Promise<FigmaDesignSystemCredentials> {
  const response = await fetch('https://www.figma.com/api/oauth/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      client_id: process.env.NEXT_PUBLIC_FIGMA_APP_CLIENT_ID!,
      client_secret: process.env.FIGMA_APP_CLIENT_SECRET!,
      redirect_uri: callbackUrl,
      code,
      grant_type: 'authorization_code',
    }),
  })

  const data = await response.json()

  return {
    userId: data.user.id,
    accessToken: data.access_token,
    expirationDate: data.expires_in,
    refreshToken: data.refresh_token,
  }
}
