import path from 'node:path'
import { parseComponents } from '../react-ast'
import fs from 'node:fs'

const directoryPath = path.join(__dirname, '../__fixtures__/all-use-cases')

const filePaths = (filenames: string[]) =>
  filenames.map(filename => path.join(directoryPath, filename))

const tsconfig = JSON.parse(
  fs.readFileSync(path.join(directoryPath, 'tsconfig.json'), 'utf8'),
)

const readExpectedComponents = async (filename: string) => {
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

const ignoreFiles = [
  'default exported arrow function/basic-properties.tsx',
  'default exported arrow function/default-value-property.tsx',
  'default exported arrow function/full-documentation.tsx',
  'default exported arrow function/internal-default-value-property.tsx',
  'default exported arrow function/without-properties.tsx',
]

describe('parseComponents', () => {
  const componentFiles = fs
    .readdirSync(directoryPath, { recursive: true })
    .filter(file => (typeof file === 'string' ? file.endsWith('.tsx') : false))
    .map(filename => filename as string)
    .filter(filename => !ignoreFiles.includes(filename))

  it.each(componentFiles)(`should return %p`, async filename => {
    const expectedComponents = (await readExpectedComponents(filename)).map(
      expected => ({ ...expected, path: filename }),
    )

    const { components } = await parseComponents(
      directoryPath,
      filePaths([filename]),
      tsconfig,
    )

    expect(components).toEqual(expectedComponents)
  })
})
