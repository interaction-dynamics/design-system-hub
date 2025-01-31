import { Component } from 'node-react-parser'
import { findProjectPath } from '../../adapters/package'

interface Props {
  options: { targetPath: string }
  context: {
    findProjectPath: (targetPath: string) => Promise<string>
    findComponents: (
      targetPath: string,
      packagePath: string,
    ) => Promise<{ components: Component[] }>
    watchDirectory: (targetPath: string, callback: () => Promise<void>) => void
    runComponentStudio: () => void
    startComponentRenderer: (components: Component[]) => void
    updateComponentRenderer: (components: Component[]) => void
  }
}

export async function runDesignSystemStudio({
  options: { targetPath },
  context: {
    findProjectPath,
    findComponents,
    watchDirectory,
    runComponentStudio,
    startComponentRenderer,
    updateComponentRenderer,
  },
}: Props) {
  const projectPath = await findProjectPath(targetPath)

  const { components } = await findComponents(targetPath, projectPath)
  startComponentRenderer(components)
  runComponentStudio()

  watchDirectory(targetPath, async () => {
    const { components } = await findComponents(targetPath, projectPath)
    updateComponentRenderer(components)
  })
}
