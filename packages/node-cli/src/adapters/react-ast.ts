import { Component } from '../entities/Component'
import ts from 'typescript'
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

export function isReactComponent(declaration: ts.Declaration): boolean {
  if (!ts.isFunctionDeclaration(declaration)) return false

  const componentNameRegex = /[A-Z][A-Za-z]+/

  if (!componentNameRegex.test(declaration.name.text)) return false

  const { statements } = declaration.body

  if (statements.length === 0) return false

  const returnStatements = statements.filter(s => ts.isReturnStatement(s))

  return returnStatements.some(s => isJsxElement(s))
}

function getPropertyTypes(
  type: ts.TypeNode,
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

  return []
}

export function getReactComponent(
  filePath: string,
  functionDeclaration: ts.FunctionDeclaration,
  sourceFile: ts.SourceFile,
): Component {
  const parameter = functionDeclaration.parameters?.[0]

  const propertyTypes = getPropertyTypes(parameter.type)

  const properties = (parameter.name as ts.ObjectBindingPattern).elements.map(
    (p: ts.BindingElement): Property => ({
      name: (p.name as ts.Identifier).escapedText as string,
      type: 'string',
      description: '',
      optional: false,
      defaultValue: p.initializer?.getText() || undefined,
      ...(propertyTypes.find(
        pt => pt.name === (p.name as ts.Identifier).escapedText,
      ) || {}),
    }),
  )

  return {
    name: functionDeclaration.name.text,
    path: filePath,
    description: '',
    properties,
  }
}
