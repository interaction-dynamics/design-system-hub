import { extractDesignSystem } from './extractor'

export async function cli() {
  const targetPath = process.cwd()

  const designSystem = await extractDesignSystem(targetPath)

  console.log(designSystem)
}

cli()
