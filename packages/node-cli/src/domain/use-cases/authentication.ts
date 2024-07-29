import { Authentication } from '../entities/authentication'

export async function initAuth(
  { token: initialToken }: { token: string },
  {
    getToken,
    postLogin,
    writeGlobalConfig,
  }: {
    getToken: () => Promise<string>
    postLogin: (email: string) => Promise<{ success: boolean }>
    writeGlobalConfig: (config: Authentication) => Promise<void>
  },
) {
  const token = initialToken ?? (await getToken())

  const { success } = await postLogin(token)

  if (success) {
    await writeGlobalConfig({ token })
  } else {
    throw new Error('Authentication failed')
  }
}
