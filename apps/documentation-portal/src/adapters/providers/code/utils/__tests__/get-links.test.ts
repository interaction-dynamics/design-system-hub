import { getLinks } from '../get-links'
import { mockComponent } from '@/domain/entities/__mocks__/mockComponent'
import { mockDesignSystem } from '@/domain/entities/__mocks__/mockDesignSystem'

describe('getLinks', () => {
  it('should return github link when ssh', () => {
    const designSystem = mockDesignSystem({
      providers: {
        code: {
          url: 'git@github.com:interaction-dynamics/design-system-hub.git',
          relativePath: 'examples/zero-config',
        },
      },
    })

    const component = mockComponent({
      providers: {
        code: {
          path: 'src/libs/atoms/input.tsx',
        },
      },
    })

    const links = getLinks(component, designSystem)

    expect(links).toEqual([
      {
        label: 'Open in GitHub',
        href: 'https://github.com/interaction-dynamics/design-system-hub/blob/main/examples/zero-config/src/libs/atoms/input.tsx',
        order: 5,
      },
    ])
  })

  it('should return github link when https', () => {
    const designSystem = mockDesignSystem({
      providers: {
        code: {
          url: 'https://github.com/interaction-dynamics/design-system-hub.git',
          relativePath: 'examples/zero-config',
        },
      },
    })

    const component = mockComponent({
      providers: {
        code: {
          path: 'src/libs/atoms/input.tsx',
        },
      },
    })

    const links = getLinks(component, designSystem)

    expect(links).toEqual([
      {
        label: 'Open in GitHub',
        href: 'https://github.com/interaction-dynamics/design-system-hub/blob/main/examples/zero-config/src/libs/atoms/input.tsx',
        order: 5,
      },
    ])
  })

  it('should return nothing when trying to hack', () => {
    const designSystem = mockDesignSystem({
      providers: {
        code: {
          url: 'https://github.commit.com:interaction-dynamics/design-system-hub.git',
          relativePath: 'examples/zero-config',
        },
      },
    })

    const component = mockComponent({
      providers: {
        code: {
          path: 'src/libs/atoms/input.tsx',
        },
      },
    })

    const links = getLinks(component, designSystem)

    expect(links).toEqual([])
  })

  it('should return gitlab link', () => {
    const designSystem = mockDesignSystem({
      providers: {
        code: {
          url: 'git@gitlab.com:interaction-dynamics/design-system-hub.git',
          relativePath: 'examples/zero-config',
        },
      },
    })

    const component = mockComponent({
      providers: {
        code: {
          path: 'src/libs/atoms/input.tsx',
        },
      },
    })

    const links = getLinks(component, designSystem)

    expect(links).toEqual([])
  })
})
