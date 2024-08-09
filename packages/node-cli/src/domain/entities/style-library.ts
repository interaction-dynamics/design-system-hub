export interface StyleLibrary {
  name: string
  version: string

  detect(projectPath: string): Promise<boolean>

  install(projectPath: string, tokenPath: string): Promise<void>
}
