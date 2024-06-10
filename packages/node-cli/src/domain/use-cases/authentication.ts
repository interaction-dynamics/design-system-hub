import { Authentication } from '../entities/authentication'

export async function initAuth({
  chooseEmail,
  authenticate,
  writeGlobalConfig,
}: {
  chooseEmail: () => Promise<string>
  authenticate: (email: string) => Promise<Authentication>
  writeGlobalConfig: (config: Authentication) => Promise<void>
}) {
  const email = await chooseEmail()

  const auth: Authentication = await authenticate(email)

  await writeGlobalConfig(auth)
}
