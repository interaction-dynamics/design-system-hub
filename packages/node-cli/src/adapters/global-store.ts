import Configstore from 'configstore'
import packageJson from '../../../../package.json'

// https://www.npmjs.com/package/configstore

export async function readGlobalConfig() {
  const config = new Configstore(packageJson.name, {})

  return config.all
}

export async function writeGlobalConfig(data: object) {
  const config = new Configstore(packageJson.name, {})

  config.set(data)
}
