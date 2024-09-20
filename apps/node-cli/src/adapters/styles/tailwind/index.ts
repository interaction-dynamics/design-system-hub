import { StyleLibrary } from '../../../domain/entities/style-library'
import { detectTailwind } from './detect-tailwind'
import { installTailwind } from './install-tailwind'

export const tailwind: StyleLibrary = {
  name: 'tailwindCSS',
  version: '*',
  detect: detectTailwind,
  install: installTailwind,
}
