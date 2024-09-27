import path from 'node:path'
import { parseComponents } from '../react-ast'
import fs from 'node:fs'

const directoryPath = path.join(__dirname, '../__fixtures__/all-use-cases')

const filePaths = (filenames: string[]) =>
  filenames.map(filename => path.join(directoryPath, filename))

const tsconfig = JSON.parse(
  fs.readFileSync(path.join(directoryPath, 'tsconfig.json'), 'utf8'),
)

const readExpectedComponents = (filename: string) => {
  try {
    return [
      JSON.parse(
        fs.readFileSync(
          path.join(directoryPath, filename.replace('.tsx', '.spec.json')),
          { encoding: 'utf8' },
        ),
      ),
    ]
  } catch (error) {
    return []
  }
}

describe('parseComponents', () => {
  const components = [
    'function/component-without-properties.tsx',
    'function/component-with-basic-properties.tsx',
    'function/default-exported-component.tsx',
    'arrow-function/component-without-properties.tsx',
    'arrow-function/component-with-basic-properties.tsx',
    // 'arrow-function/default-exported-component.tsx', // TODO [Hacktoberfest] Implement for this test
    'variable-function/component-without-properties.tsx',
    'variable-function/component-with-basic-properties.tsx',
    'no-component/camel-case-function.tsx',
    'no-component/camel-case-arrow-function.tsx',
    'no-component/camel-case-variable-function.tsx',
  ]

  it.each(components)(`should return %p`, async filename => {
    const expectedComponents = readExpectedComponents(filename)

    const components = await parseComponents(
      directoryPath,
      filePaths([filename]),
      tsconfig,
    )

    expect(components).toEqual(expectedComponents)
  })
})
