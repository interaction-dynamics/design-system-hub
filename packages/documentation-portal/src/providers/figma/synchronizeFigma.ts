import Component from '@/features/component/types/Component'
import DesignSystem from '../../features/designSystem/types/DesignSystem'
import Section from '@/features/designSystem/types/Chapter'

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
