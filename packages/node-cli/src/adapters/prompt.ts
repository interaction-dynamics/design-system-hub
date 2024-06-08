import chalk from 'chalk'
import Enquirer from 'enquirer'

const { prompt } = Enquirer

export async function confirm(question: string) {
  const confirm = await prompt({
    type: 'confirm',
    name: 'confirm',
    initial: true,
    message: question,
  })

  return Boolean(confirm)
}

export async function text(question: string, defaultValue?: string) {
  const answer = await prompt<{ input: string }>({
    type: 'input',
    name: 'input',
    message: question,
    initial: defaultValue,
  })

  return answer.input
}

export async function select(
  question: string,
  choices: { name: string; value: string }[],
) {
  const answer = await prompt<{ input: string }>({
    type: 'select',
    name: 'input',
    message: question,
    choices: choices.map(({ name }) => name),
  })

  const choice = choices.find(({ name }) => name === answer.input)

  return choice
}

export function printText(text: string) {
  // eslint-disable-next-line no-console
  console.log(text)
}

export function printWarning(text: string) {
  printText(chalk.yellow.bold(text))
}
