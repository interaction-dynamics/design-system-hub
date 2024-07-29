# Node-cli

This is a simple CLI tool to detect the react components. It will soon include features to synchronize the components with the online documentation.

## Getting started

```bash
# for just checking the detected component
npx dshub dev --cwd <path to design system>

# for synchronizing the detected components with the online documentation
npx dshub sync --token <token> --cwd <path to design system> # check the online documentation for the token.
```

The output is:

```yaml
provider:
  relativePath: examples/zero-config/src/libs
  url: git@github.com:interaction-dynamics/design-system-hub.git
components:
  - name: Button
    path: atoms/button.tsx
    description: A Button component
    properties:
      - name: children
        type: React.ReactNode
        optional: false
        description: The content of the button
      - name: variant
        type: "'primary' | 'black' | 'basic'"
        optional: false
        description: ""
      - name: onClick
        type: () => void | Promise<void>
        optional: true
        description: ""
        defaultValue: () => {}
  - name: Input
    path: atoms/input.tsx
    description: ""
    properties:
      - name: value
        type: string | number
        optional: false
        description: ""
      - name: onChange
        type: "(value: string) => void"
        optional: false
        description: ""
        defaultValue: () => {}
      - name: placeholder
        type: string
        optional: true
        description: ""
  - name: Card
    path: molecules/card.tsx
    description: ""
    properties:
      - name: title
        type: React.ReactNode
        optional: false
        description: ""
      - name: description
        type: React.ReactNode
        optional: false
        description: ""

3 components found.
8 properties found.
2 / 11 descriptions found.
```

## Development

```bash
pnpm install

pnpm cli dev <path to design system>

# For example
pnpm cli dev ../../examples/zero-config/src/libs
```
