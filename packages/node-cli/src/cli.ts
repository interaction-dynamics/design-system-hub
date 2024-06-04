import { Command } from 'commander'
import path from 'node:path'

import { extractDesignSystem } from './api'
import packageJson from '../package.json'

const program = new Command()

program
  .name('ds')
  .description(packageJson.description)
  .version(packageJson.version)

program
  .command('setup')
  .description('Configure in which folder is the design system')
  .action(() => {})

program
  .command('dev')
  .description('Find all the React components from the target directory')
  .argument('<directory>', 'design system directory')
  .option(
    '-v, --verbose',
    'activate verbose mode where all the details of the components are displayed',
  )
  .action(async (str, options) => {
    console.log('target', str)

    try {
      const targetPath = path.resolve(process.cwd(), str)

      const designSystem = await extractDesignSystem(targetPath)

      console.log(designSystem)
    } catch (error) {
      console.error(error)
    }
  })

program
  .command('deploy')
  .description('Deploy design system on the documentation portal')
  .option(
    '-v, --verbose',
    'activate verbose mode where all the details of the components are displayed',
  )
  .action(async (str, options) => {
    console.log('target', str)

    try {
      const targetPath = path.resolve(process.cwd(), str)

      const designSystem = await extractDesignSystem(targetPath)

      console.log(designSystem)
    } catch (error) {
      console.error(error)
    }
  })

program.parse()
