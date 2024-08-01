import ReactMarkdown from 'react-markdown'

interface Props {
  children: string
}

export function Markdown({ children }: Props) {
  return (
    <ReactMarkdown
      components={{
        h1(props) {
          return (
            <h1
              className="scroll-m-20 text-4xl font-bold tracking-tight"
              {...props}
            />
          )
        },
        h2(props) {
          return (
            <h1
              className="font-heading mt-12 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
              {...props}
            />
          )
        },
        p(props) {
          return <p className="text-sm text-muted-foreground py-1" {...props} />
        },
        blockquote(props) {
          return (
            <blockquote
              className="bg-muted p-2 rounded-md my-1 text-primary text-sm"
              {...props}
            />
          )
        },
      }}
    >
      {children}
    </ReactMarkdown>
  )
}
