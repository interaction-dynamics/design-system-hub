import path from 'node:path'

import { Component } from '../entities/component'
import { DesignSystem } from '../entities/design-system'
import { Organization } from '../entities/organization'
import { Config } from '../entities/config'
import { Page } from '../entities/page'

interface Arguments {
  options: { targetPath: string }
  context: {
    findRepositoryUrl: (targetPath: string) => Promise<string>
    findProject: (targetPath: string) => Promise<{ name: string; path: string }>
    findRootPath: (targetPath: string) => Promise<string>
    getRelativePath: (rootPath: string, targetPath: string) => string
    detectComponents: (
      targetPath: string,
      packagePath: string,
    ) => Promise<Component[]>
    detectPages: (packagePath: string) => Promise<Page[]>
  }
}

export async function findDesignSystem({
  options: { targetPath },
  context: {
    findRepositoryUrl,
    findProject,
    findRootPath,
    getRelativePath,
    detectComponents,
    detectPages,
  },
}: Arguments): Promise<DesignSystem> {
  const rootPath = await findRootPath(targetPath)
  const relativePath = getRelativePath(rootPath, targetPath)

  const url = await findRepositoryUrl(targetPath)
  const { path } = await findProject(targetPath)

  const components = await detectComponents(targetPath, path)

  const pages = await detectPages(path)

  return {
    provider: {
      relativePath,
      url,
    },
    components,
    pages,
  }
}

export async function linkDesignSystem(
  {
    projectPath,
    targetPath,
    token,
    config,
  }: {
    projectPath: string
    targetPath: string | undefined
    token: string
    config: Config | undefined
  },
  {
    promptInput,
    promptConfirm,
    promptSelect,
    requestOrganizations,
    requestDesignSystems,
    saveConfig,
    getRelativePath,
  }: {
    readGlobalConfig: () => Promise<{ token: string }>
    promptInput: (message: string, optionalValue?: string) => Promise<string>
    promptConfirm: (message: string) => Promise<boolean>
    promptSelect: (
      message: string,
      choices: { name: string; value: string }[],
    ) => Promise<{ name: string; value: string } | undefined>
    requestOrganizations: (token: string) => Promise<Organization[]>
    requestDesignSystems: (
      token: string,
      organizationId: string,
    ) => Promise<Array<{ id: string; name: string }>>
    saveConfig: ({
      projectPath,
      config,
    }: {
      projectPath: string
      config: {
        organizationId: string
        designSystemId: string
        designSystemPath: string
      }
    }) => Promise<void>
    getRelativePath: (rootPath: string, targetPath: string) => string
  },
): Promise<DesignSystem> {
  if (targetPath) {
    const confirmation = await promptConfirm(`Set up and deploy ${targetPath}?`)

    if (!confirmation) return
  } else {
    targetPath = await promptInput(
      `Which design system directory to link?`,
      config?.designSystemPath,
    )
  }

  const organizations = await requestOrganizations(token)

  if (organizations.length === 0) {
    throw new Error('No organizations found')
  }

  let organization: Organization | null = null

  if (organizations.length === 1) {
    const confirmation = await promptConfirm(
      `Use organization "${organizations[0].name}"?`,
    )

    if (confirmation) {
      organization = organizations[0]
    }
  } else {
    const org = await promptSelect(
      'Choose organization:',
      organizations.map(org => ({ name: org.name, value: org.id })),
    )

    organization = organizations.find(o => o.id === org?.value)
  }

  if (!organization) {
    throw new Error('No organization selected')
  }

  let designSystem: { name: string; id: string } | null = null

  const designSystems = await requestDesignSystems(token, organization.id)

  if (designSystems.length === 0) {
    throw new Error('No design system found')
  }

  if (designSystems.length === 1) {
    const confirmation = await promptConfirm(
      `Use design system "${designSystems[0].name}"?`,
    )

    if (confirmation) {
      designSystem = designSystems[0]
    }
  } else {
    const designSystemId = await promptSelect(
      'Choose design system:',
      designSystems.map(d => ({ name: d.name, value: d.id })),
    )

    designSystem = designSystems.find(d => d.id === designSystemId.value)
  }

  if (!designSystem) {
    throw new Error('No design system selected')
  }

  await saveConfig({
    projectPath,
    config: {
      organizationId: organization.id,
      designSystemId: designSystem.id,
      designSystemPath: getRelativePath(projectPath, targetPath),
    },
  })
}

export async function pushDesignSystem(
  {
    projectPath,
    config,
    token,
  }: { projectPath: string; config: Config; token: string },
  {
    findDesignSystem,
    postDesignSystem,
  }: {
    findDesignSystem: (targetPath: string) => Promise<DesignSystem>
    postDesignSystem: (
      token: string,
      organizationId: string,
      designSystemId: string,
      designSystem: DesignSystem,
    ) => Promise<boolean>
  },
) {
  const designSystem = await findDesignSystem(
    path.join(projectPath, config.designSystemPath),
  )

  const answer = await postDesignSystem(
    token,
    config.organizationId,
    config.designSystemId,
    designSystem,
  )

  if (!answer) {
    throw new Error('Failed to push design system')
  }
}
