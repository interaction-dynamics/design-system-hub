const Foo = function ({ one = () => {} }: { one: VoidFunction }) {
  return <div>Foo</div>
}

export { Foo }
