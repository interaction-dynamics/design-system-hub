export interface Props {
  onClick?: () => void | Promise<void>
}

export const Foo = ({ onClick = () => {} }: Props) => {
  return <button onClick={onClick}>foo</button>
}
