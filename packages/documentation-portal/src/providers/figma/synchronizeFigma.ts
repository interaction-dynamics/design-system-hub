import Component from '@/features/component/types/Component'
import DesignSystem from '../../entities/design-system/design-system'
import Section from '@/entities/design-system/chapter'

export default function synchronizeFimga(
  designSystem: DesignSystem,
  sections: Section[],
  components: Component[]
) {
  const designSystemSlug = designSystem.slug

  return {
    designSystem,
    sections,
    components,
  }
}
