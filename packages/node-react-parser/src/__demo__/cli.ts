import path from 'node:path'
import fs from 'node:fs'

import { findComponents } from '../index'

const printInfo = (info: string) => process.stdout.write(`${info}\n`)

const relativePathDirectory = process.argv[2]

if (!relativePathDirectory) {
  printInfo('Please provide a target directory as argument demo <target>')
  process.exit(2)
}

const targetDirectory = path.join(process.cwd(), relativePathDirectory)

if (!fs.existsSync(targetDirectory)) {
  printInfo('Target directory does not exist')
  process.exit(2)
}

const projectDirectory = findTsConfigFolder(targetDirectory)

findComponents(projectDirectory, targetDirectory).then(components => {
  printInfo(JSON.stringify(components, null, 2))
})

function findTsConfigFolder(directory: string): string {
  const tsConfigPath = path.join(directory, 'tsconfig.json')
  if (fs.existsSync(tsConfigPath)) {
    return directory
  }
  const parentDirectory = path.join(directory, '..')
  return findTsConfigFolder(parentDirectory)
}
