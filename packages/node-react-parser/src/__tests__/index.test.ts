import path from 'node:path'
import { findComponents } from '../index'

describe('findComponents', () => {
  describe('Zero components', () => {
    const projectPath = path.join(__dirname, '../__fixtures__/no-components')
    const dirPath = projectPath

    it('should return 0 component', async () => {
      const { components } = await findComponents(projectPath, dirPath)

      expect(components).toHaveLength(0)
    })
  })

  describe('One component', () => {
    const projectPath = path.join(__dirname, '../__fixtures__/one-component')
    const dirPath = projectPath

    it('should return 1 component', async () => {
      const { components } = await findComponents(projectPath, dirPath)

      expect(components).toHaveLength(1)
    })

    it('should return 1 component with name ', async () => {
      const { components } = await findComponents(projectPath, dirPath)

      expect(components[0]).toEqual({
        description: '',
        name: 'Foo',
        path: 'foo.tsx',
        properties: [],
      })
    })
  })

  describe('One component with properties', () => {
    const projectPath = path.join(
      __dirname,
      '../__fixtures__/one-component-with-basic-properties',
    )
    const dirPath = projectPath

    it('should return 1 component', async () => {
      const { components } = await findComponents(projectPath, dirPath)

      expect(components).toHaveLength(1)
    })

    it('should return 1 component with name ', async () => {
      const { components } = await findComponents(projectPath, dirPath)

      expect(components[0]).toEqual({
        description: '',
        name: 'Foo',
        path: 'foo.tsx',
        properties: [
          {
            name: 'one',
            type: 'string',
          },
          {
            name: 'two',
            type: 'number',
          },
          {
            name: 'three',
            type: 'boolean',
          },
        ],
      })
    })
  })
})
