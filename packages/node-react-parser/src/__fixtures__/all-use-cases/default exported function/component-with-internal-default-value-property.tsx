export default function Foo(props: { one: VoidFunction }) {
  const { one = () => {} } = props
  return <div>Foo</div>
}
