import ts from 'typescript'

import path from 'node:path'
import { listFiles } from '../utils/list-files'
import { Component } from '../entities/Component'
import { readTsConfigFile } from './tsconfig'
import { getReactComponent, isReactComponent } from './react-ast'

export async function detectComponents(
  dirPath: string,
  projectDirectory: string,
) {
  const files = (await listFiles(dirPath)).filter(file => file.endsWith('.tsx'))

  const tsConfigFilename = path.join(projectDirectory, './tsconfig.json')
  const compilerOptions = await readTsConfigFile(tsConfigFilename)

  const host = ts.createCompilerHost(compilerOptions)

  const components: Component[] = []

  for (const file of files) {
    const filePath = path.join(dirPath, file)

    const program = ts.createProgram([filePath], compilerOptions, host)
    const sourceFile = program.getSourceFile(filePath)

    const checker = program.getTypeChecker()

    const sourceFileSymbol = checker.getSymbolAtLocation(sourceFile)!
    const exports = checker.getExportsOfModule(sourceFileSymbol)

    components.push(
      getReactComponent(
        file,
        exports[0].declarations[0] as ts.FunctionDeclaration,
        sourceFile,
        checker,
      ),
    )
  }

  return components
}
