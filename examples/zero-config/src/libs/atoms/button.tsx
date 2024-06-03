export interface Props {
  /** The content of the button */
  children: React.ReactNode
  variant: 'primary' | 'black' | 'basic'
  onClick?: () => void | Promise<void>
}

/**
 * A Button component
 */
export function Button({ children, onClick = () => {} }: Props) {
  return <button onClick={onClick}>{children}</button>
}
