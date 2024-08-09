import path from 'node:path'
import { detectTailwind } from '../detect-tailwind'

const fixtureProjectPath = (name: string) =>
  path.resolve(__dirname, `../../../../../../../examples/${name}`)

describe('detectTailwind', () => {
  it('should return false for empty', async () => {
    const emptyProject = fixtureProjectPath('empty')

    expect(await detectTailwind(emptyProject)).toBe(false)
  })

  it('should return false fore zero-config', async () => {
    const zeroConfigProject = fixtureProjectPath('empty')

    expect(await detectTailwind(zeroConfigProject)).toBe(false)
  })

  it('should return true for with-tokens-tailwind', async () => {
    const tailwindProject = fixtureProjectPath('with-tokens-tailwind')

    expect(await detectTailwind(tailwindProject)).toBe(true)
  })
})
