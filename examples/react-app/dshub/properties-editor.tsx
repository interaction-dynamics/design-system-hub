interface PropertySchema {
  type: string
  defaultValue: string
}

interface Props {
  propertiesSchema: Record<string, PropertySchema>
  properties: Record<string, any>
  onPropertiesChange: (newProperties: Record<string, any>) => void
}

export function PropertiesEditor({
  propertiesSchema,
  properties,
  onPropertiesChange,
}: Props) {
  return (
    <div>
      <h1>Properties Editor</h1>
      <div>
        {Object.entries(propertiesSchema).map(([propertyName, schema]) => (
          <div>
            {propertyName}:{' '}
            <input
              value={properties[propertyName]}
              onChange={event => {
                onPropertiesChange({
                  ...properties,
                  [propertyName]: event.target.value,
                })
              }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
