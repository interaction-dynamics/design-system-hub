import { z } from 'zod'

export interface CodeComponentProvider {
  path: string
  deprecated?: boolean
  description: string
}

export const CodeComponentProviderValidator = z.object({
  path: z.string(),
  deprecated: z.boolean().optional(),
  description: z.string(),
})
