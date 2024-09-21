import path from 'node:path'
import { detectComponents } from '../react-ast'
import fs from 'node:fs'

const directoryPath = path.join(__dirname, '../__fixtures__/all-use-cases')

const filePaths = (filenames: string[]) =>
  filenames.map(filename => path.join(directoryPath, filename))

const tsconfig = JSON.parse(
  fs.readFileSync(path.join(directoryPath, 'tsconfig.json'), 'utf8'),
)

const readExpectedComponent = (filename: string) =>
  JSON.parse(
    fs.readFileSync(
      path.join(directoryPath, filename.replace('.tsx', '.spec.json')),
      { encoding: 'utf8' },
    ),
  )

describe('detectComponents', () => {
  it('should not return components when there are none', async () => {
    const components = await detectComponents(
      directoryPath,
      filePaths([]),
      tsconfig,
    )

    expect(components).toEqual([])
  })

  const components = [
    'function/component-without-properties.tsx',
    'function/component-with-basic-properties.tsx',
    'function/default-exported-component.tsx',
    'arrow-function/component-without-properties.tsx',
    'arrow-function/component-with-basic-properties.tsx',
    // 'arrow-function/default-exported-component.tsx',
  ]

  it.each(components)(`should return %p`, async filename => {
    const expectedComponent = readExpectedComponent(filename)

    const components = await detectComponents(
      directoryPath,
      filePaths([filename]),
      tsconfig,
    )

    expect(components).toEqual([expectedComponent])
  })
})
