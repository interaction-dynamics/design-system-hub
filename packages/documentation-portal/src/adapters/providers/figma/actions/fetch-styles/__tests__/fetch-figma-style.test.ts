import { fetchFigmaStyle } from '../fetch-figma-style'
import mockedFigmaStyles from '../__fixtures__/figma-styles.json'

jest.mock('../../../utils/figma-api', () => ({
  fetchFigmaApi: jest.fn().mockImplementation((token: string, url: string) =>
    url === 'files/zTNDlw3P1z5pjm9mOFzB62/styles'
      ? {
          ok: true,
          json: jest.fn().mockResolvedValue(mockedFigmaStyles),
        }
      : {
          ok: false,
          statusText: 'Not found',
        }
  ),
}))

describe('fetchFigmaStyle', () => {
  it('should return an array of styles', async () => {
    const file = 'zTNDlw3P1z5pjm9mOFzB62'

    const styles = await fetchFigmaStyle(file, 'token')

    expect(styles).toEqual(mockedFigmaStyles.meta.styles)
  })

  it('should throw error when wrong file', async () => {
    const expectedError = new Error('Failed to fetch Figma styles for file foo')

    const promise = fetchFigmaStyle('foo', 'token')

    await expect(promise).rejects.toEqual(expectedError)
  })
})
