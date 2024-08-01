import { cleanPageTitle } from '../page'

describe('cleanPageTitle', () => {
  it('should return a title with the first letter capitalized', () => {
    const result = cleanPageTitle({ filePath: 'my-page.md' })
    expect(result).toEqual('My page')
  })

  it('should replace dashes with spaces', () => {
    const result = cleanPageTitle({ filePath: 'my-page.md' })
    expect(result).toEqual('My page')
  })

  it('should remove the .md extension', () => {
    const result = cleanPageTitle({ filePath: 'my-page.md' })
    expect(result).toEqual('My page')
  })

  it('should remove the number prefix', () => {
    const result = cleanPageTitle({ filePath: '01-my-page.md' })
    expect(result).toEqual('My page')
  })
})
