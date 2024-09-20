export const getSyncCommand = (designSystemToken: string) =>
  `npx dshub sync --token ${designSystemToken} --cwd <designSystemPath>`
