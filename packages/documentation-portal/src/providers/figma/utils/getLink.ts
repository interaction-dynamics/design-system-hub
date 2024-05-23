import Component, {
  ComponentVariant,
} from '@/features/component/types/Component'

export function getLink(component: Component | ComponentVariant) {
  return {
    label: 'Open in Figma',
    href: `https://www.figma.com/design/${component.origin.figma?.fileKey}?node-id=${component.origin.figma?.nodeId}`,
  }
}
