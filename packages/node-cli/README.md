# Node-cli

A CLI tool to detect the react components. It will soon include features to synchronize the components with the online documentation.

## Getting started

```bash
# for just checking the detected component
npx dshub@latest dev --cwd <path to design system>

# for synchronizing the detected components with the online documentation
npx dshub@latest sync --token <token> --cwd <path to design system> # check the online documentation for the token.

npx dshub@latest pull --token <token> --cwd <path to design system> # check the online documentation for the token.

# If you use a personal instant of design system hub you can use the following command

DSHUB_HOST=<host> npx dshub@latest sync --token <token> --cwd <path to design system> # check the online documentation for the token.

```

The output of `npx dshub@latest dev --cwd <path to design system>` will be something like this:

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
pages:
  - path: 00-how-it-works.md
    content: >
      # How it works

      ...
  - path: accessibility.md
    content: >
      ...
  - path: internationzalization.md
    content: >
      ...
3 components found.
8 properties found.
2 / 11 descriptions found.
3 pages found.
```

## Development

```bash
pnpm install

pnpm cli dev <path to design system>

# For example
pnpm cli dev ../../examples/zero-config/src/libs
```

## Technologies

- [Style-dictionary](https://v4.styledictionary.com/)
