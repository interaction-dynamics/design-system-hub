import { installStyles } from '../domain/use-cases/design-token'
import { styleLibraries } from '../adapters/styles'
import { findProjectPath } from '../adapters/package'

export async function install(targetPath) {
  return await installStyles(
    { targetPath, styleLibraries },
    {
      findProjectPath,
    },
  )
}
