interface Props {
  value: string | number
  onChange: (value: string) => void
  placeholder?: string
}

export function Input({ value, onChange, placeholder }: Props) {
  return (
    <input
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
    />
  )
}
