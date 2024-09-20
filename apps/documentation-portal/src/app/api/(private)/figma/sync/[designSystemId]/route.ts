import { fetchDesignSystem } from '@/adapters/providers/figma/actions/fetch-design-system'
import {
  createComponent,
  findComponentByName,
  updateComponent,
} from '@/adapters/data-access/components'
import {
  createComponentVariant,
  deleteComponentVariants,
} from '@/adapters/data-access/component-variants'
import { NextRequest } from 'next/server'
import { getUser } from '../../../../_utils/get-user'
import { fetchStyles } from '@/adapters/providers/figma/actions/styles'
import { deleteStyles, insertStyles } from '@/adapters/data-access/styles'
import { findFigmaFilesByDesignSystemId } from '@/adapters/data-access/figma-file'
import { findFigmaComponents } from '@/adapters/providers/figma/actions/design-system'
import { findFigmaDesignSystemCredentials } from '@/adapters/data-access/figma-design-system-credentials'
import { syncComponent } from '@/domain/use-cases/sync-component'
import { syncStyles } from '@/domain/use-cases/sync-styles'
import { replaceThumbnailUrl } from '@/adapters/providers/figma/actions/design-system/replace-thumbnail-url'
import { copyAsset } from '@/adapters/storage/assets'

export async function POST(
  request: NextRequest,
  { params }: { params: { designSystemId: string } }
) {
  const { designSystemId } = params

  const { accessToken } = await findFigmaDesignSystemCredentials(designSystemId)

  const files = await findFigmaFilesByDesignSystemId(designSystemId)

  const fileKeys = files.map((file) => file.fileKey)

  const components = await findFigmaComponents(fileKeys, accessToken)

  await Promise.all(
    components.map(async (componentWithOrlThumbnailUrl) => {
      const component = await replaceThumbnailUrl(
        { component: componentWithOrlThumbnailUrl },
        { copyAsset }
      )

      return syncComponent(
        { designSystemId: designSystemId, component },
        {
          findComponentByName,
          updateComponent,
          deleteComponentVariants,
          createComponentVariant,
          createComponent,
        }
      )
    })
  )

  const styles = await fetchStyles(fileKeys, accessToken)

  await syncStyles({ designSystemId, styles }, { deleteStyles, insertStyles })

  return Response.json({ status: 'ok', styles, components })
}
