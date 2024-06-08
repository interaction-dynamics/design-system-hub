import Configstore from 'configstore'
import packageJson from '../../../../package.json'

// https://www.npmjs.com/package/configstore

const config = new Configstore(packageJson.name, {})

export async function readGlobalConfig() {
  return config.all
}

export async function writeGlobalConfig(data: object) {
  config.set(data)
}
