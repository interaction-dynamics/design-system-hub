export async function fetchFigmaApi(token: string, url: string) {
  return await fetch(`https://api.figma.com/v1/${url}`, {
    headers: {
      'X-FIGMA-TOKEN': token,
    },
  })
}
