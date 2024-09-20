import { initAuth } from '../domain/use-cases/authentication'
import { printText, text } from '../adapters/prompt'
import { writeGlobalConfig, readGlobalConfig } from '../adapters/global-store'
import { postLogin } from '../adapters/rest-api'

export async function login(token?: string) {
  const getToken = () => text(`Enter the token:`)

  await initAuth({ token }, { getToken, postLogin, writeGlobalConfig })

  printText('Login successful')
}

export async function isConnected() {
  return (await readGlobalConfig())?.token
}

export async function logout() {
  await writeGlobalConfig({ token: '' })

  printText('Logout successful')
}
