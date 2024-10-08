export interface Props {
  /** The content of the button */
  children: React.ReactNode
  variant: 'primary' | 'black' | 'basic'
  onClick?: () => void | Promise<void>
}

/**
 * A Button component
 */
export function Button(props: Props) {
  console.log('props', props)

  const { children, onClick = () => {} } = props

  return <button onClick={onClick}>{children}</button>
}
