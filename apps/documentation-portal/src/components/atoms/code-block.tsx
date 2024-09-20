interface Props {
  children: React.ReactNode
  language: string
}

export function CodeBlock({ children, language = 'bash' }: Props) {
  return (
    <code
      className="block max-h-[650px] overflow-x-auto rounded-lg border bg-zinc-950 py-4 px-4 dark:bg-zinc-900 font-mono text-sm"
      data-language={language}
      data-theme="default"
    >
      {children}
    </code>
  )
}
