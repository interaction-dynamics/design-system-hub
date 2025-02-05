const Foo = function (props: { one: VoidFunction }) {
  const { one = () => {} } = props
  return <div>Foo</div>
}

export { Foo }
