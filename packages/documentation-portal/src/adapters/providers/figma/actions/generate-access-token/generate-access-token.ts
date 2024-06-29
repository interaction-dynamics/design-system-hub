export async function generateAccessToken(callbackUrl: string, code: string) {
  const response = await fetch('https://api.figma.com/v1/oauth/token', {
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

  return await response.json()
}
