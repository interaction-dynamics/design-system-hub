import { makeSdTailwindConfig } from 'sd-tailwindcss-transformer'
import StyleDictionary from 'style-dictionary'

export async function installTailwind(
  projectPath: string,
  tokenPath: string,
): Promise<void> {
  const sdConfig = makeSdTailwindConfig({
    type: 'all',
    isVariables: true,
    source: [`${tokenPath}/**/*.json`],
  })

  const styleDictionary = new StyleDictionary({
    ...sdConfig,
    platforms: {
      css: {
        transformGroup: 'css',
        buildPath: `${projectPath}/src/`,
        files: [
          {
            destination: 'tailwind.css',
            format: 'css/variables',
            options: {
              outputReferences: true,
            },
          },
        ],
      },
    },
  })
  styleDictionary.buildAllPlatforms()
}
