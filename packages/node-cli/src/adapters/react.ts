import {
  TypescriptParser,
  FunctionDeclaration,
  ObjectBoundParameterDeclaration,
  InterfaceDeclaration,
} from 'typescript-parser'
import path from 'node:path'
import { listFiles } from '../utils/list-files'
import { Component } from '../entities/Component'
import { Property } from '../entities/Property'

export async function detectComponents(dirPath: string) {
  // https://buehler.github.io/node-typescript-parser/index.html
  const parser = new TypescriptParser()

  const files = (await listFiles(dirPath)).filter(file => file.endsWith('.tsx'))

  const components: Component[] = []

  for (const file of files) {
    const parsed = await parser.parseFile(path.join(dirPath, file), dirPath)

    console.log(parsed)

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

        components.push({
          name: declaration.name,
          path: file,
          description: '',
          properties,
        })
      }
    }
  }

  return components
}
