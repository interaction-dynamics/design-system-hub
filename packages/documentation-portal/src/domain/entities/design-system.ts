import { Chapter } from './chapter'
import { PartialComponent } from '@/domain/entities/partial-component'

export class DesignSystem {
  name: string
  slug: string
  chapters: Chapter[]
  /**
   * only the part of the component needed to show the menu and fetch the full components when we arrive on the page of the component
   */
  partialComponents: PartialComponent[]

  constructor(
    name: string,
    slug: string,
    chapters: Chapter[],
    partialComponents: PartialComponent[]
  ) {
    this.name = name
    this.slug = slug
    this.chapters = chapters
    this.partialComponents = partialComponents
  }
}
