import { capitalizeFirstLetter } from '../capitalize-first-letter'

describe('capitalizeFirstLetter', () => {
  it('should capitalize the first letter of a string', () => {
    expect(capitalizeFirstLetter('hello')).toBe('Hello')
  })

  it('should return an empty string if the input is an empty string', () => {
    expect(capitalizeFirstLetter('')).toBe('')
  })

  it('should return the input if the input is a single character', () => {
    expect(capitalizeFirstLetter('a')).toBe('A')
  })

  it('should return the input if the input is already capitalized', () => {
    expect(capitalizeFirstLetter('Hello')).toBe('Hello')
  })
})
