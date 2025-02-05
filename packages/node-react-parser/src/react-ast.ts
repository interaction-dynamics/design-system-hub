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

      return exports.flatMap(symbol =>
        getReactComponents(filePath, symbol, checker, sourceFileSymbol),
      )
    })
    .map(component => ({
      ...component,
      path: relative(directoryPath, component.path),
    }))
    .sort((a, b) => `${a.path}/${a.name}`.localeCompare(`${b.path}/${b.name}`))

  return { components }
}

export function getDefaultValue(
  parameter: ts.ParameterDeclaration,
  name: string,
) {
  try {
    const elements = parameter.name as ts.ObjectBindingPattern

    const parameterProperty = elements.elements.find(
      (p: ts.BindingElement) => p.name.getText() === name,
    )

    return {
      ...(parameterProperty?.initializer
        ? { defaultValue: parameterProperty?.initializer.getText() }
        : {}),
    }
  } catch {
    return {}
  }
}

function getProperties(
  parameter: ts.ParameterDeclaration,
  checker: ts.TypeChecker,
) {
  const propertyTypes = parameter
    ? getPropertyTypes(parameter.type, checker)
    : []

  return propertyTypes.map(type => {
    return {
      name: type.name,
      type: type.type,
      ...(type.description ? { description: type.description } : {}),
      ...getDefaultValue(parameter, type.name),
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
  sourceFileSymbol: ts.Symbol,
): Component[] {
  return symbol.declarations.flatMap(declaration => {
    const component = findComponentNameAndParameter(
      declaration,
      checker,
      sourceFileSymbol,
    )

    if (!component) return []

    const { name, parameter, description, isDeprecated } = component

    return [
      {
        name,
        path: filePath,
        description,
        properties: getProperties(parameter, checker),
        ...(isDeprecated ? { deprecated: true } : {}),
      },
    ]
  })
}

const isPascalCase = (name: string) => /^[A-Z][A-Za-z]+/.test(name)

function findComponentNameAndParameter(
  declaration: ts.Declaration,
  checker: ts.TypeChecker,
  sourceFileSymbol: ts.Symbol,
) {
  // export function Foo () {
  if (
    ts.isFunctionDeclaration(declaration) &&
    isPascalCase(declaration.name.getText())
  ) {
    return {
      name: declaration.name.getText(),
      parameter: declaration.parameters[0],
      isDeprecated: checker
        .getTypeAtLocation(declaration)
        .symbol.getJsDocTags()
        .some(tag => tag.name === 'deprecated'),
      description:
        ts.displayPartsToString(
          checker
            .getTypeAtLocation(declaration)
            .symbol?.getDocumentationComment(checker),
        ) ?? '',
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
      isDeprecated: checker
        .getTypeAtLocation(declaration.initializer)
        .symbol.getJsDocTags()
        .some(tag => tag.name === 'deprecated'),
      description:
        ts.displayPartsToString(
          checker
            .getTypeAtLocation(declaration.initializer)
            .symbol?.getDocumentationComment(checker),
        ) ?? '',
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
      isDeprecated: checker
        .getTypeAtLocation(declaration)
        .symbol.getJsDocTags()
        .some(tag => tag.name === 'deprecated'),
      description:
        ts.displayPartsToString(
          checker
            .getTypeAtLocation(declaration)
            .symbol?.getDocumentationComment(checker),
        ) ?? '',
    }
  }

  // export default Foo; const Foo = () => {
  if (
    ts.isExportAssignment(declaration) &&
    isPascalCase(declaration.expression.getText())
  ) {
    const declarations = declaration.expression
      .getSourceFile()
      .statements.filter(state => ts.isVariableStatement(state))
      .flatMap(state =>
        ts.isVariableStatement(state)
          ? state.declarationList.declarations.map(d => ({
              declaration: d,
              symbol: undefined,
            }))
          : ([] as {
              declaration: ts.VariableDeclaration
              symbol: ts.Symbol
            }[]),
      )

    const realComponent = declarations
      ?.map(({ declaration: d }) =>
        findComponentNameAndParameter(d, checker, sourceFileSymbol),
      )
      .filter(Boolean)
      .find(({ name }) => name === declaration.expression.getText())

    return realComponent
  }

  if (
    ts.isExportSpecifier(declaration) &&
    isPascalCase(declaration.getText())
  ) {
    const declarations = declaration
      .getSourceFile()
      .statements.filter(state => ts.isVariableStatement(state))
      .flatMap(state =>
        ts.isVariableStatement(state)
          ? state.declarationList.declarations.map(d => ({
              declaration: d,
              symbol: undefined,
            }))
          : ([] as {
              declaration: ts.VariableDeclaration
              symbol: ts.Symbol
            }[]),
      )

    const realComponent = declarations
      ?.map(({ declaration: d }) =>
        findComponentNameAndParameter(d, checker, sourceFileSymbol),
      )
      .filter(Boolean)
      .find(({ name }) => name === declaration.getText())

    return realComponent
  }

  return null
}
