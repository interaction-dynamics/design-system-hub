export interface Props {
  /** The content of the button */
  children: React.ReactNode
}

export const Foo = ({ children }: Props) => {
  return <div>{children}</div>
}
