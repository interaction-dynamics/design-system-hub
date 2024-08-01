import generateSlug from '../generate-slug'

describe('generateSlug', () => {
  it('should generate a slug from a string', () => {
    const input = 'This is a test string'
    const output = 'this-is-a-test-string'

    expect(generateSlug(input)).toBe(output)
  })
})
