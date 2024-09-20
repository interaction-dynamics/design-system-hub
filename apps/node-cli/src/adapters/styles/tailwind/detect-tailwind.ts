import { access, constants } from 'node:fs/promises'
import path from 'node:path'

async function fileExists(path: string) {
  try {
    await access(path, constants.F_OK)
    return true
  } catch (error) {
    return false
  }
}

export async function detectTailwind(projectPath: string) {
  return (
    fileExists(path.join(projectPath, 'tailwind.config.js')) ||
    fileExists(path.join(projectPath, 'tailwind.config.js'))
  )
}
