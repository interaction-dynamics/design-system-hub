export interface Props {
  /** The content of the button */
  children: React.ReactNode
  /** @deprecated */
  variant: 'primary' | 'black' | 'basic'
  onClick?: () => void | Promise<void>
}

/**
 * A Button component
 * @deprecated
 */
export const Foo = function ({ children, onClick = () => {} }: Props) {
  return <button onClick={onClick}>{children}</button>
}
