import { relative } from 'node:path'
import { Component } from './entities/component'
import * as ts from 'typescript'
import { Property } from './entities/property'

export async function detectComponents(
  directoryPath: string,
  filenames: string[],
  compilerOptions: ts.CompilerOptions,
): Promise<Component[]> {
  const host = ts.createCompilerHost(compilerOptions)

  const program = ts.createProgram(filenames, compilerOptions, host)
  const checker = program.getTypeChecker()

  return filenames
    .flatMap(filePath => {
      const sourceFile = program.getSourceFile(filePath)

      const sourceFileSymbol = checker.getSymbolAtLocation(sourceFile)
      const exports = checker.getExportsOfModule(sourceFileSymbol)

      return exports.flatMap(e => getReactComponents(filePath, e, checker))
    })
    .map(component => ({
      ...component,
      path: relative(directoryPath, component.path),
    }))
    .sort((a, b) => `${a.path}/${a.name}`.localeCompare(`${b.path}/${b.name}`))
}

function isReactComponent(
  declaration: ts.Declaration,
): declaration is ts.FunctionDeclaration {
  if (!ts.isFunctionDeclaration(declaration)) return false

  const componentNameRegex = /^[A-Z][A-Za-z]+/

  if (!componentNameRegex.test(declaration.name.text)) return false

  return true
}

function getPropertyTypes(
  type: ts.TypeNode,
  checker: ts.TypeChecker,
): Pick<
  Property,
  'name' | 'type' | 'optional' | 'description' | 'deprecated'
>[] {
  if (ts.isTypeLiteralNode(type)) {
    return type.members
      .filter(m => ts.isPropertySignature(m))
      .map((m: ts.PropertySignature) => {
        return {
          name: m.name.getText(),
          type: m.type.getText(),
          optional: m.questionToken !== undefined,
          description: '',
          deprecated: false,
        }
      })
  }

  if (ts.isTypeReferenceNode(type)) {
    const { symbol } = checker.getTypeFromTypeNode(type)

    return Array.from(symbol.members, ([, value]) => value).map(value => {
      return {
        name: value.escapedName.toString(),
        type:
          (
            value.valueDeclaration as ts.ParameterDeclaration
          )?.type?.getText() || 'string',
        optional:
          (value.valueDeclaration as ts.ParameterDeclaration)?.questionToken !==
          undefined,
        description:
          ts.displayPartsToString(value.getDocumentationComment(checker)) ?? '',
        deprecated: value.getJsDocTags().some(tag => tag.name === 'deprecated'),
      }
    })
  }

  return []
}

function getReactComponents(
  filePath: string,
  symbol: ts.Symbol,
  checker: ts.TypeChecker,
): Component[] {
  const component = findComponentNameAndParameter(symbol)

  if (!component) return []

  const { name, parameter, isDeprecated } = component

  const propertyTypes = parameter
    ? getPropertyTypes(parameter.type, checker)
    : []

  const properties = propertyTypes.map(type => {
    const parameterProperty = (
      parameter.name as ts.ObjectBindingPattern
    ).elements.find((p: ts.BindingElement) => p.name.getText() === type.name)

    return {
      name: type.name,
      type: type.type,
      ...(type.description ? { description: type.description } : {}),
      ...(parameterProperty?.initializer
        ? { defaultValue: parameterProperty?.initializer.getText() }
        : {}),
      ...(type.deprecated ? { deprecated: true } : {}),
      ...(type.optional ? { optional: true } : {}),
    }
  })

  return [
    {
      name,
      path: filePath,
      description:
        ts.displayPartsToString(symbol.getDocumentationComment(checker)) ?? '',
      properties,
      ...(isDeprecated ? { deprecated: true } : {}),
    },
  ]
}

function findComponentNameAndParameter(symbol: ts.Symbol):
  | {
      name: string
      parameter: ts.ParameterDeclaration | undefined
      isDeprecated: boolean
    }
  | undefined {
  const declaration = symbol.declarations[0]

  const isDeprecated = symbol
    .getJsDocTags()
    .some(tag => tag.name === 'deprecated')

  if (isReactComponent(declaration)) {
    return {
      name: declaration.name.getText(),
      parameter: declaration.parameters[0],
      isDeprecated,
    }
  }

  if (ts.isVariableDeclaration(declaration)) {
    if (
      ts.isFunctionDeclaration(declaration.initializer) ||
      ts.isArrowFunction(declaration.initializer)
    ) {
      return {
        name: declaration.name.getText(),
        parameter: declaration.initializer?.parameters?.[0],
        isDeprecated,
      }
    }
  }

  return undefined
}
