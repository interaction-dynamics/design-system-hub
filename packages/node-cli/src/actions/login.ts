import { initAuth } from '../domain/use-cases/authentication'
import { printText, text } from '../adapters/prompt'
import { writeGlobalConfig, readGlobalConfig } from '../adapters/global-store'
import { authenticate } from '../adapters/rest-api'

export async function login() {
  const chooseEmail = () => text(`Enter your email:`)

  initAuth({ chooseEmail, authenticate, writeGlobalConfig })

  printText('Login successful')
}

export async function isConnected() {
  return (await readGlobalConfig())?.token
}

export async function logout() {
  await writeGlobalConfig({ token: '' })

  printText('Logout successful')
}
