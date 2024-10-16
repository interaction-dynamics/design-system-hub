export interface Props {
  children: React.ReactNode
}

/**
 * A Button component
 */
export function Foo({ children }: Props) {
  return <div>{children}</div>
}
