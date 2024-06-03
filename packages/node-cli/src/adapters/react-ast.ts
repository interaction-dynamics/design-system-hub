import { Component } from '../entities/Component'
import ts, { TypeChecker } from 'typescript'
import { Property } from '../entities/Property'

function isJsxElement(node: ts.Node): boolean {
  if (ts.isJsxElement(node)) return true

  if (ts.isJsxSelfClosingElement(node)) return true

  if (ts.isJsxFragment(node)) return true

  if (ts.isParenthesizedExpression(node)) {
    return isJsxElement(node.expression)
  }

  return false
}

export function isReactComponent(
  declaration: ts.Declaration,
  checker: TypeChecker,
): boolean {
  if (!ts.isFunctionDeclaration(declaration)) return false

  const componentNameRegex = /[A-Z][A-Za-z]+/

  if (!componentNameRegex.test(declaration.name.text)) return false

  const { statements } = declaration.body

  if (statements.length === 0) return false

  // checker.getSignatureFromDeclaration(declaration)?.getReturnType()

  const returnStatements = statements.filter(s => ts.isReturnStatement(s))

  return returnStatements.some(s => isJsxElement(s))
}

function getPropertyTypes(
  type: ts.TypeNode,
  sourceFile: ts.SourceFile,
  checker: ts.TypeChecker,
): Pick<Property, 'name' | 'type' | 'optional'>[] {
  const properties = []

  if (ts.isTypeLiteralNode(type)) {
    return type.members
      .filter(m => ts.isPropertySignature(m))
      .map((m: ts.PropertySignature) => ({
        name: m.name.getText(),
        type: m.type.getText(),
        optional: m.questionToken !== undefined,
      }))
  }

  if (ts.isTypeReferenceNode(type)) {
    const { symbol } = checker.getTypeFromTypeNode(type)

    return Array.from(symbol.members, ([, value]) => value).map(value => ({
      name: value.escapedName.toString(),
      type: (value.valueDeclaration as any)?.type?.getText() || 'string',
      optional: (value.valueDeclaration as any)?.questionToken !== undefined,
    }))

    // if (ts.isInterfaceDeclaration(symbol)) {
    //   return symbol.members.map((m: ts.PropertySignature) => ({
    //     name: m.name.getText(),
    //     type: m.type.getText(),
    //     optional: m.questionToken !== undefined,
    //   }))
    // }
  }

  return []
}

export function getReactComponent(
  filePath: string,
  functionDeclaration: ts.FunctionDeclaration,
  sourceFile: ts.SourceFile,
  checker: ts.TypeChecker,
): Component {
  const parameter = functionDeclaration.parameters?.[0]

  const propertyTypes = getPropertyTypes(parameter.type, sourceFile, checker)

  const properties = propertyTypes.map(type => ({
    name: type.name,
    type: type.type,
    optional: type.optional,
    description: '',
    defaultValue:
      (parameter.name as ts.ObjectBindingPattern).elements
        .find((p: ts.BindingElement) => p.name.getText() === type.name)
        ?.initializer?.getText() || undefined,
  }))

  return {
    name: functionDeclaration.name.text,
    path: filePath,
    description: '',
    properties,
  }
}
