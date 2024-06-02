import { exec } from 'node:child_process'
import { promisify } from 'node:util'

const spawnPromises = promisify(exec)

async function executeCommand(command: string, cwd: string) {
  const { stdout, stderr } = await spawnPromises(command, { cwd })

  if (stderr) {
    throw new Error(stderr)
  }

  return stdout.trim()
}

export async function findRemoteUrl(cwd: string) {
  return executeCommand('git remote get-url --all origin', cwd)
}

export async function findRootPath(cwd: string) {
  return executeCommand('git rev-parse --show-toplevel', cwd)
}
