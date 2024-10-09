import { relative } from 'node:path'
import { Component } from './entities/component'
import ts from 'typescript'
import { Property } from './entities/property'

export async function parseComponents(
  directoryPath: string,
  filenames: string[],
  compilerOptions: ts.CompilerOptions,
): Promise<{ components: Component[] }> {
  const host = ts.createCompilerHost(compilerOptions)

  const program = ts.createProgram(filenames, compilerOptions, host)
  const checker = program.getTypeChecker()

  const components = filenames
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

  return { components }
}

function getProperties(
  parameter: ts.ParameterDeclaration,
  checker: ts.TypeChecker,
) {
  const propertyTypes = parameter
    ? getPropertyTypes(parameter.type, checker)
    : []

  return propertyTypes.map(type => {
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
  const isDeprecated = symbol
    .getJsDocTags()
    .some(tag => tag.name === 'deprecated')

  return symbol.declarations.flatMap(declaration => {
    const component = findComponentNameAndParameter(declaration)

    if (!component) return []

    const { name, parameter } = component

    return [
      {
        name,
        path: filePath,
        description:
          ts.displayPartsToString(symbol.getDocumentationComment(checker)) ??
          '',
        properties: getProperties(parameter, checker),
        ...(isDeprecated ? { deprecated: true } : {}),
      },
    ]
  })
}

const isPascalCase = (name: string) => /^[A-Z][A-Za-z]+/.test(name)

function findComponentNameAndParameter(declaration: ts.Declaration) {
  // export function Foo () {
  if (
    ts.isFunctionDeclaration(declaration) &&
    isPascalCase(declaration.name.getText())
  ) {
    return {
      name: declaration.name.getText(),
      parameter: declaration.parameters[0],
    }
  }

  // export const Foo = () => {
  if (
    ts.isVariableDeclaration(declaration) &&
    ts.isArrowFunction(declaration.initializer) &&
    isPascalCase(declaration.name.getText())
  ) {
    return {
      name: declaration.name.getText(),
      parameter: declaration.initializer?.parameters?.[0],
    }
  }

  // export const Foo = function () {
  if (
    ts.isVariableDeclaration(declaration) &&
    ts.isFunctionExpression(declaration.initializer) &&
    isPascalCase(declaration.name.getText())
  ) {
    return {
      name: declaration.name.getText(),
      parameter: declaration.initializer?.parameters?.[0],
    }
  }

  return null

  // export default Foo; const Foo = () => {
  // if (
  //   ts.isVariableDeclaration(declaration)
  //   // ts.isArrowFunction(declaration.initializer) &&
  //   // isPascalCase(declaration.name.getText())
  // ) {
  //   console.log('declaration')
  //   return {
  //     name: declaration.name.getText(),
  //     parameter: null, // declaration.initializer?.parameters?.[0],
  //   }
  // }
}
