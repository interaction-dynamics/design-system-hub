import { Command } from 'commander'
import path from 'node:path'

import { extractDesignSystem } from './api'
import packageJson from '../package.json'
import { setup } from './actions/setup'

const program = new Command()

program
  .name('ds')
  .description(packageJson.description)
  .version(packageJson.version)

program
  .command('setup')
  .description('Configure in which folder is the design system')
  .argument('[directory]', 'design system directory', process.cwd())
  .action(async str => {
    await setup(str)
  })

program
  .command('dev')
  .description('Find all the React components from the target directory')
  .argument('[directory]', 'design system directory', process.cwd())
  .action(async (str, options) => {
    try {
      const targetPath = path.resolve(process.cwd(), str)

      const designSystem = await extractDesignSystem(targetPath)

      console.log(designSystem)
    } catch (error) {
      console.error(error)
    }
  })

program.parse()
