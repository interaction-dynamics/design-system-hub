import { DesignSystem } from '@/domain/entities/design-system'
import { CodeComponent } from '../types/code-component'

const github = {
  name: 'GitHub',
  match: (url: string) => url.includes('github.com'),
  getLink: (path: string, designSystem: DesignSystem) => {
    const url = designSystem.providers.code.url

    if (url.startsWith('git@')) {
      const match = url.matchAll(/.*:([a-z\-_]+)\/(.*)/g)
      if (match) {
        const [found] = match

        const [_, owner, repo] = found

        const repoWithoutGit = repo.replace('.git', '')

        return `https://github.com/${owner}/${repoWithoutGit}/blob/main/${designSystem.providers.code.relativePath}/${path}`
      }
    } else if (url.startsWith('https://')) {
      return `${url}/blob/main/${designSystem.providers.code.relativePath}/${path}`
    }

    return ''
  },
}

const providers = [github]

function extractProvider(component: CodeComponent, designSystem: DesignSystem) {
  const url = designSystem.providers.code.url

  const provider = providers.find((provider) => provider.match(url))

  if (provider) return provider

  return undefined
}

export function getLinks(component: CodeComponent, designSystem: DesignSystem) {
  const provider = extractProvider(component, designSystem)

  if (!provider) return []

  return [
    {
      label: `Open in ${provider.name}`,
      href: provider.getLink(component.providers.code.path, designSystem),
      order: 5,
    },
  ]
}
