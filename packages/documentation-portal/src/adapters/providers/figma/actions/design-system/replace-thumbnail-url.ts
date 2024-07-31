import { FigmaComponent } from '../../types/figma-component'

export const replaceThumbnailUrl = async (
  {
    component,
  }: {
    component: FigmaComponent
  },
  {
    copyAsset,
  }: {
    copyAsset: (url: string) => Promise<string>
  }
): Promise<FigmaComponent> => {
  return {
    ...component,
    variants: await Promise.all(
      component.variants.map(async (variant) => {
        return {
          ...variant,
          providers: {
            ...variant.providers,
            figma: {
              ...variant.providers.figma,
              thumbnailUrl: await copyAsset(
                variant.providers.figma.thumbnailUrl
              ),
            },
          },
        }
      })
    ),
    providers: {
      ...component.providers,
      figma: {
        ...component.providers.figma,
        thumbnailUrl: await copyAsset(component.providers.figma.thumbnailUrl),
      },
    },
  }
}
