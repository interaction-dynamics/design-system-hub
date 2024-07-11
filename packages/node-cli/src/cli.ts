import { Command } from 'commander'
import path from 'node:path'
import yaml from 'yaml'
import chalk from 'chalk'

import packageJson from '../package.json'
import { extractDesignSystem } from './actions/extract-design-system'
// import { isConnected, login, logout } from './actions/login'
// import { printWarning } from './adapters/prompt'
// import { link } from './actions/link'
import { sync } from './actions/sync'

const program = new Command()

program
  .name('ds')
  .description(packageJson.description)
  .version(packageJson.version)

// program
//   .command('login')
//   .description('Login')
//   .option('--token <token>', 'user token')
//   .action(async options => {
//     if (await isConnected()) {
//       printWarning('You are already logged in. Run `logout` command to logout.')
//       return
//     }

//     await login(options.token)
//   })

// program
//   .command('logout')
//   .description('Logout')
//   .action(async () => {
//     await logout()
//   })

// program
//   .command('link')
//   .description('Link')
//   .argument('[directory]', 'design system directory')
//   .option(
//     '--cwd <project_path>',
//     'path to the project directory',
//     process.cwd(),
//   )
//   .action(async (str, options) => {
//     await link(options.cwd, str)
//   })

program
  .command('sync')
  .description('Synchronize the design system with the Design System Hub')
  .option(
    '--cwd <design_system_path>',
    'path to the design system directory',
    process.cwd(),
  )
  .option('--token <token>', 'project token')

  .action(async options => {
    await sync(options.cwd, options.token)
  })

const logSummary = (s: string) => console.warn(chalk.yellow.bold(s))

// eslint-disable-next-line no-console
const logInfo = (s: string) => console.log(s)

program
  .command('dev')
  .description('Find all the React components from the target directory')
  .option('--json', 'display the output with json format')
  .option('--summary', 'show only the summary')
  .option(
    '--cwd <design_system_path>',
    'path to the design system directory',
    process.cwd(),
  )
  .action(async options => {
    const targetPath = path.resolve(process.cwd(), options.cwd)

    const designSystem = await extractDesignSystem(targetPath)

    if (options.json) {
      logInfo(JSON.stringify(designSystem, null, 2))
    } else {
      if (!options.summary) {
        logInfo(yaml.stringify(designSystem))
      }

      logSummary(`${designSystem.components.length} components found.`)
      const properties = designSystem.components.flatMap(c => c.properties)
      logSummary(`${properties.length} properties found.`)
      const descriptions = [...designSystem.components, ...properties]
      const filledDescriptions = descriptions.filter(d => d.description)
      logSummary(
        `${filledDescriptions.length} / ${descriptions.length} descriptions found.`,
      )

      logSummary(`${designSystem.pages.length} pages found.`)
    }
  })

program.parse()
