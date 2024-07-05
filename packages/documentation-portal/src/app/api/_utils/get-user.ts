import type { NextRequest } from 'next/server'
import { User } from '@/domain/entities/user'

export async function getUser(request: NextRequest): Promise<User | undefined> {
  const authorization = request.headers.get('Authorization')

  if (authorization !== `Token ${process.env.AUTH_TOKEN_SECRET}`) {
    return undefined
  }

  return {
    id: '1',
    name: 'John Doe',
    email: '',
    slug: 'user',
  }
}
