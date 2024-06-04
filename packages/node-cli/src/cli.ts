import { Command } from 'commander'
import path from 'node:path'
import yaml from 'yaml'
import chalk from 'chalk'

import packageJson from '../package.json'
import { setup } from './actions/setup'
import { extractDesignSystem } from './actions/extract-design-system'

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
    const targetPath = path.resolve(process.cwd(), str)

    await setup(str)
  })

program
  .command('dev')
  .description('Find all the React components from the target directory')
  .option('--json', 'display the output with json format')
  .option('-s, --summary', 'display some debugging')
  .argument('[directory]', 'design system directory', process.cwd())

  .action(async (str, options) => {
    const targetPath = path.resolve(process.cwd(), str)

    const designSystem = await extractDesignSystem(targetPath)

    if (options.json) {
      console.log(JSON.stringify(designSystem, null, 2))
    } else {
      console.log(yaml.stringify(designSystem))
    }

    console.warn(
      chalk.yellow.bold(`${designSystem.components.length} components found.`),
    )
  })

program.parse()
