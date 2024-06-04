import path, { relative } from 'node:path'
import { Component } from '../entities/Component'
import ts, { ParameterDeclaration, VariableDeclaration } from 'typescript'
import { Property } from '../entities/Property'
import { listFiles } from '../utils/list-files'
import { readTsConfigFile } from './tsconfig'

export async function detectComponents(
  dirPath: string,
  projectDirectory: string,
): Promise<Component[]> {
  const files = (await listFiles(dirPath)).filter(file => file.endsWith('.tsx'))

  const tsConfigFilename = path.join(projectDirectory, './tsconfig.json')
  const compilerOptions = await readTsConfigFile(tsConfigFilename)

  const host = ts.createCompilerHost(compilerOptions)

  const filePaths = files.map(file => path.join(dirPath, file))

  const program = ts.createProgram(filePaths, compilerOptions, host)
  const checker = program.getTypeChecker()

  return filePaths
    .flatMap(filePath => {
      const sourceFile = program.getSourceFile(filePath)

      const sourceFileSymbol = checker.getSymbolAtLocation(sourceFile)
      const exports = checker.getExportsOfModule(sourceFileSymbol)

      return exports.flatMap(e => getReactComponents(filePath, e, checker))
    })
    .map(component => ({
      ...component,
      path: relative(dirPath, component.path),
    }))
    .sort((a, b) => `${a.path}/${a.name}`.localeCompare(`${b.path}/${b.name}`))
}

function isReactComponent(
  declaration: ts.Declaration,
): declaration is ts.FunctionDeclaration {
  if (!ts.isFunctionDeclaration(declaration)) return false

  const componentNameRegex = /[A-Z][A-Za-z]+/

  if (!componentNameRegex.test(declaration.name.text)) return false

  return true
}

function getPropertyTypes(
  type: ts.TypeNode,
  checker: ts.TypeChecker,
): Pick<Property, 'name' | 'type' | 'optional' | 'description'>[] {
  if (ts.isTypeLiteralNode(type)) {
    return type.members
      .filter(m => ts.isPropertySignature(m))
      .map((m: ts.PropertySignature) => ({
        name: m.name.getText(),
        type: m.type.getText(),
        optional: m.questionToken !== undefined,
        description: '',
      }))
  }

  if (ts.isTypeReferenceNode(type)) {
    const { symbol } = checker.getTypeFromTypeNode(type)

    return Array.from(symbol.members, ([, value]) => value).map(value => ({
      name: value.escapedName.toString(),
      type:
        (value.valueDeclaration as ParameterDeclaration)?.type?.getText() ||
        'string',
      optional:
        (value.valueDeclaration as ParameterDeclaration)?.questionToken !==
        undefined,
      description:
        ts.displayPartsToString(value.getDocumentationComment(checker)) ?? '',
    }))
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

  const { name, parameter } = component

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
      optional: type.optional,
      description: type.description,
      defaultValue: parameterProperty?.initializer?.getText() || undefined,
    }
  })

  return [
    {
      name,
      path: filePath,
      description:
        ts.displayPartsToString(symbol.getDocumentationComment(checker)) ?? '',
      properties,
    },
  ]
}

function findComponentNameAndParameter(
  symbol: ts.Symbol,
):
  | { name: string; parameter: ts.ParameterDeclaration | undefined }
  | undefined {
  let declaration = symbol.declarations[0]

  if (isReactComponent(declaration)) {
    return {
      name: declaration.name.getText(),
      parameter: declaration.parameters[0],
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
      }
    }
  }

  return undefined
}
