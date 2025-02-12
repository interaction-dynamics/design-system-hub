import { fileURLToPath } from 'node:url'
import { server } from '../server'

const libPath = fileURLToPath(
  new URL('./__fixtures__/react-app', import.meta.url),
)

import components from './components.json'

server(libPath, components).listen()
