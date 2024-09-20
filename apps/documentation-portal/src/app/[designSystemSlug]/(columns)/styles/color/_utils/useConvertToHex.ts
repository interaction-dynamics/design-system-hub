export function useConvertToHex() {
  return (rgba: string, forceRemoveAlpha = false) => {
    return (
      '#' +
      rgba
        .replace(/^rgba?\(|\s+|\)$/g, '') // Get's rgba / rgb string values
        .split(',') // splits them at ","
        .filter((string: string, index) => !forceRemoveAlpha || index !== 3)
        .map((string) => parseFloat(string)) // Converts them to numbers
        .map((number, index) =>
          index === 3 ? Math.round(number * 255) : number
        ) // Converts alpha to 255 number
        .map((number) => number.toString(16)) // Converts numbers to hex
        .map((string) => (string.length === 1 ? '0' + string : string))
        .join('') // Puts the array to togehter to a string
    )
  }
}
