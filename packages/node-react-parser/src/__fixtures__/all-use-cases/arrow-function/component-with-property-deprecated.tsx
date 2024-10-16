export interface Props {
  /** @deprecated */
  variant: 'primary' | 'black' | 'basic'
}

export const Foo = ({ variant }: Props) => {
  return <div>{variant}</div>
}
