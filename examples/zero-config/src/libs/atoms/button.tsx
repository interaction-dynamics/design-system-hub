interface Props {
  children: React.ReactNode
  variant: 'primary' | 'black' | 'basic'
  onClick?: () => void | Promise<void>
}

/**
 * A Buttom component
 */
export function Button({ children, onClick = () => {} }: Props) {
  return <button onClick={onClick}>{children}</button>
}
