import { writeFile } from 'node:fs/promises'

import { pullDesignToken } from '../domain/use-cases/design-token'
import { findProjectPath } from '../adapters/package'
import { fetchDesignTokens } from '../adapters/rest-api'
import { makeDirectory } from '../adapters/file-system'

export async function pull(targetPath: string, token?: string) {
  return await pullDesignToken(
    { token, targetPath },
    { writeFile, findProjectPath, fetchDesignTokens, makeDirectory },
  )
}
