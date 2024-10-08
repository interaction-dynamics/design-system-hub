#!/usr/bin/env node

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
import { pull } from './actions/pull'
import { install } from './actions/install'

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

const name = 'Design System Hub'

program
  .command('sync')
  .description(`Synchronize the design system with the ${name}`)
  .option(
    '--cwd <design_system_path>',
    'path to the design system directory',
    process.cwd(),
  )
  .option('--verbose', 'activate verbose mode')
  .option('--token <token>', 'project token')
  .action(async options => {
    const designSystem = await sync(options.cwd, options.token)

    if (options.verbose) {
      logInfo(yaml.stringify(designSystem))
    }
  })

program
  .command('pull')
  .description(`Pull tokens from the ${name}`)
  .option(
    '--cwd <design_system_path>',
    'path to the design system directory',
    process.cwd(),
  )
  .option('--token <token>', 'project token')
  .action(async options => {
    const tokenFiles = await pull(options.cwd, options.token)

    tokenFiles.forEach(({ filename }) => {
      logInfo(`Token file created: ${filename}`)
    })

    const library = await install(options.cwd)

    logInfo(`Installed styles for ${library.name}`)
  })

program
  .command('install')
  .option(
    '--cwd <design_system_path>',
    'path to the design system directory',
    process.cwd(),
  )
  .action(async options => {
    const library = await install(options.cwd)

    logInfo(`Installed styles for ${library.name}`)
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
