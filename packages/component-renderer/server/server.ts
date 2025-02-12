import { createServer, ViteDevServer } from 'vite'
import { Server } from 'socket.io'
import { fileURLToPath } from 'node:url'
import { DesignSystem } from '@design-system-hub/entities'
import { generateImportFile } from './generate-import-file'
import path from 'node:path'
import { removeExtension } from './remove-extension'
import { cp, cpSync } from 'node:fs'

interface Options {
  httpPort: number
  socketPort: number
}

class RendererServer {
  private options: Options

  private libPath: string
  private viteServer: ViteDevServer
  private ioServer: Server
  private designSystem: DesignSystem

  constructor(
    libPath: string,
    designSystem: DesignSystem,
    options: Partial<Options> = {},
  ) {
    this.libPath = libPath
    this.options = {
      httpPort: 3000,
      socketPort: 3001,
      ...options,
    }
    this.designSystem = designSystem
  }

  async listen() {
    const dshubPath = path.resolve(this.libPath, '.dshub')

    const serverPath = fileURLToPath(new URL('../renderer', import.meta.url))

    cpSync(serverPath, dshubPath, { recursive: true })

    const importFilePath = `${dshubPath}/components-imports.tsx`

    generateImportFile(this.designSystem, importFilePath)

    this.viteServer = await createServer({
      configFile: false,
      root: dshubPath,
      server: {
        port: this.options.httpPort,
      },
    })
    await this.viteServer.listen()

    this.viteServer.printUrls()
    this.viteServer.bindCLIShortcuts({ print: true })

    this.ioServer = new Server({
      cors: {
        origin: `http://localhost:${this.options.httpPort}`,
      },
    })

    this.ioServer.on('connection', socket => {
      socket.emit('design-system', this.designSystem)
    })

    this.ioServer.listen(this.options.socketPort)
  }

  async close() {
    this.ioServer.close()
    this.viteServer.close()
  }

  async refresh(designSystem: DesignSystem) {
    this.designSystem = designSystem
    this.ioServer.emit('design-system', this.designSystem)
  }
}

export const server = (
  libPath: string,
  designSystem: DesignSystem,
  options: Partial<Options> = {},
) => new RendererServer(libPath, designSystem, options)
