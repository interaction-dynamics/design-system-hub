export function Foo({ one = () => {} }: { one: VoidFunction }) {
  return <div>Foo</div>
}
