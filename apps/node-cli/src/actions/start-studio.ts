import { findComponents } from 'node-react-parser'
import { findPackageConfig } from '../adapters/package'
import { runDesignSystemStudio } from '../domain/use-cases/run-design-system-studio'
import { watchDirectory } from '../adapters/file-system'
import { printText } from '../adapters/prompt'

export async function startStudio(targetPath: string) {
  printText('Starting the design system studio...')

  runDesignSystemStudio({
    options: { targetPath },
    context: {
      findProjectPath: async targetPath =>
        (await findPackageConfig(targetPath)).path,
      findComponents,
      watchDirectory,
      runComponentStudio: () => {
        printText('Running component studio...')
      },
      startComponentRenderer: components => {
        printText('Starting component renderer...')
        printText(JSON.stringify(components, null, 2))
      },
      updateComponentRenderer: components => {
        printText('Updating component renderer...')
        printText(JSON.stringify(components, null, 2))
      },
    },
  })
}
