import path from 'node:path'
import { listTsxFiles, readTsConfigFile } from '../file-system'

describe('listTsxFiles', () => {
  it('should list all .tsx files in the given directory', async () => {
    const dir = path.join(__dirname, '../__fixtures__/different-extensions')

    const files = await listTsxFiles(dir)

    expect(files).toEqual([path.join(dir, 'foo.tsx')])
  })
})

describe('readTsConfigFile', () => {
  it('should read the tsconfig.json file', async () => {
    const dir = path.join(__dirname, '../__fixtures__/with-tsconfig')

    const compilerOptions = await readTsConfigFile(dir)

    expect(compilerOptions).toEqual({
      compilerOptions: {
        jsx: 'react-jsx',
        target: 'ES2017',
        moduleResolution: 'bundler',
        typeRoots: ['node_modules/@types', 'src/types'],
        types: ['node', 'jest', '@testing-library/jest-dom'],
        esModuleInterop: true,
        baseUrl: '.',
        paths: {
          '~/*': ['./*'],
        },
      },
    })
  })
})
