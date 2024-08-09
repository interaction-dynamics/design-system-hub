/**
 * A description of the Input component
 */
export default function Input({
  value,
  onChange = () => {},
  placeholder,
}: {
  value: string | number;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    />
  );
}
