import {
  TypescriptParser,
  FunctionDeclaration,
  ObjectBoundParameterDeclaration,
  InterfaceDeclaration,
} from 'typescript-parser'
import ts from 'typescript'

import path from 'node:path'
import { listFiles } from '../utils/list-files'
import { Component } from '../entities/Component'
import { Property } from '../entities/Property'
import { readTsConfigFile } from './tsconfig'
import { getReactComponent } from './react-ast'

export async function detectComponents(
  dirPath: string,
  projectDirectory: string,
) {
  // https://buehler.github.io/node-typescript-parser/index.html
  const parser = new TypescriptParser()

  const files = (await listFiles(dirPath)).filter(file => file.endsWith('.tsx'))

  const tsConfigFilename = path.join(projectDirectory, './tsconfig.json')
  const compilerOptions = await readTsConfigFile(tsConfigFilename)

  const host = ts.createCompilerHost(compilerOptions)

  const components: Component[] = []

  for (const file of files) {
    const filePath = path.join(dirPath, file)

    const parsed = await parser.parseFile(filePath, dirPath)

    const program = ts.createProgram([filePath], compilerOptions, host)
    const sourceFile = program.getSourceFile(filePath)

    // console.log(sourceFile.statements[1])

    // console.log(ts.isFunctionDeclaration(sourceFile.statements[1]))

    const checker = program.getTypeChecker()

    const sourceFileSymbol = checker.getSymbolAtLocation(sourceFile)!
    const exports = checker.getExportsOfModule(sourceFileSymbol)

    console.log(
      'component',
      // exports[0].declarations,
      getReactComponent(
        file,
        exports[0].declarations[0] as ts.FunctionDeclaration,
        sourceFile,
      ),
    )

    const regexComponent = /[A-Z][A-Za-z]+/

    for (const declaration of parsed.declarations) {
      if (declaration instanceof FunctionDeclaration) {
        if (
          declaration.name.startsWith('use') ||
          !declaration.isExported ||
          !regexComponent.test(declaration.name)
        ) {
          // we skip hooks and we skip components that are not exported
          continue
        }

        const properties: Property[] = []

        const firstParameter = declaration.parameters?.[0]

        if (firstParameter instanceof ObjectBoundParameterDeclaration) {
          const propsInterface = parsed.declarations.find(
            d => d.name === firstParameter.typeReference,
          )

          if (propsInterface instanceof InterfaceDeclaration) {
            properties.push(
              ...(propsInterface.properties.map(param => ({
                name: param.name,
                type: param.type,
                description: '',
                optional: false,
                defaultValue: undefined,
              })) || []),
            )
          }
        }

        components.push(
          getReactComponent(
            file,
            exports[0].declarations[0] as ts.FunctionDeclaration,
            sourceFile,
          ),
        )
      }
    }
  }

  return components
}
