import bcrypt from 'bcrypt'

export async function hash(token: string) {
  const saltRounds = 10
  return await bcrypt.hash(token, saltRounds)
}

export async function compare(token: string, hash: string) {
  return await bcrypt.compare(token, hash)
}
