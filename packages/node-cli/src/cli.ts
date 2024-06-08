/* eslint-disable no-console */
import { Command } from 'commander'
import path from 'node:path'
import yaml from 'yaml'
import chalk from 'chalk'

import packageJson from '../package.json'
import { extractDesignSystem } from './actions/extract-design-system'
import { isConnected, login, logout } from './actions/login'
import { printWarning } from './adapters/prompt'
import { link } from './actions/link'
import { sync } from './actions/sync'

const program = new Command()

program
  .name('ds')
  .description(packageJson.description)
  .version(packageJson.version)
  .action(() => {
    console.log('foo')
  })

program
  .command('login')
  .description('Login')
  .action(async () => {
    if (await isConnected()) {
      printWarning('You are already logged in. Run `logout` command to logout.')
      return
    }

    await login()
  })

program
  .command('logout')
  .description('Logout')
  .action(async () => {
    await logout()
  })

program
  .command('link')
  .description('Link')
  .argument('[directory]', 'design system directory')
  .option(
    '--cwd <project_path>',
    'path to the project directory',
    process.cwd(),
  )
  .action(async (str, options) => {
    await link(options.cwd, str)
  })

program
  .command('sync')
  .description('Sync')
  .option(
    '--cwd <project_path>',
    'path to the project directory',
    process.cwd(),
  )
  .action(async options => {
    await sync(options.cwd)
  })

const logSummary = (s: string) => console.warn(chalk.yellow.bold(s))

program
  .command('dev')
  .description('Find all the React components from the target directory')
  .option('--json', 'display the output with json format')
  .argument('[directory]', 'design system directory', process.cwd())
  .action(async (str, options) => {
    const targetPath = path.resolve(process.cwd(), str)

    const designSystem = await extractDesignSystem(targetPath)

    if (options.json) {
      console.log(JSON.stringify(designSystem, null, 2))
    } else {
      console.log(yaml.stringify(designSystem))

      logSummary(`${designSystem.components.length} components found.`)
      const properties = designSystem.components.flatMap(c => c.properties)
      logSummary(`${properties.length} properties found.`)
      const descriptions = [...designSystem.components, ...properties]
      const filledDescriptions = descriptions.filter(d => d.description)
      logSummary(
        `${filledDescriptions.length} / ${descriptions.length} descriptions found.`,
      )
    }
  })

program.parse()
