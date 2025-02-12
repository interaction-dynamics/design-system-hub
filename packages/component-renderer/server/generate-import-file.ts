import { DesignSystem } from '@design-system-hub/entities'
import { mkdirSync, writeFileSync } from 'fs'
import path from 'path'
import { removeExtension } from './remove-extension'

export function generateImportFile(
  designSystem: DesignSystem,
  filePath: string,
) {
  const buildImport = (componentPath: string) => {
    return `  '${componentPath}': async () => await import('../${removeExtension(componentPath)}'),`
  }

  const content = `export default {
    ${designSystem.components.map(c => buildImport(c.path)).join('\n')}
  }`

  console.log(`Writing import file to ${filePath}`)
  mkdirSync(path.dirname(filePath), { recursive: true })
  writeFileSync(filePath, content)
}
