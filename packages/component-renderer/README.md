# Node React Parser

This is a parser for React component. It can parse a folder of React components and generate a JSON file with the components and their props.

This is the second version of the parser. The first version was directly included in the [CLI tool](https://github.com/interaction-dynamics/design-system-hub/blob/master/apps/node-cli/src/adapters/react-ast.ts). This new version is a standalone package that can be used in other projects.

It is still a work in progress and it is not yet published to npm. We are waiting for a good coverage of tests before publishing it.

If you come across this package from the Hacktoberfest, please check the discussion on the [Hacktoberfest 2024](https://github.com/interaction-dynamics/design-system-hub/discussions/90).

## Usage

Even if it is not published to npm, we have a demo to show how the parser can be used. Check the [demo folder](./src/__demo__) for more information.

## What is the parser doing?

If returns you a JSON file with the components and their props. Here is an example of the output:

```json
[
  {
    "name": "ButtonLegacy",
    "path": "atoms/button-legacy.tsx",
    "description": "A Button component",
    "properties": [
      {
        "name": "children",
        "type": "React.ReactNode",
        "description": "The content of the button"
      },
      {
        "name": "variant",
        "type": "\"primary\" | \"black\" | \"basic\"",
        "deprecated": true
      },
      {
        "name": "onClick",
        "type": "() => void | Promise<void>",
        "defaultValue": "() => {}",
        "optional": true
      }
    ],
    "deprecated": true
  },
  {
    "name": "Button",
    "path": "atoms/button.tsx",
    "description": "A Button component",
    "properties": [
      {
        "name": "children",
        "type": "React.ReactNode",
        "description": "The content of the button"
      },
      {
        "name": "variant",
        "type": "'primary' | 'black' | 'basic'"
      },
      {
        "name": "onClick",
        "type": "() => void | Promise<void>",
        "defaultValue": "() => {}",
        "optional": true
      }
    ]
  },
  {
    "name": "Input",
    "path": "atoms/input.tsx",
    "description": "A description of the Input component",
    "properties": [
      {
        "name": "value",
        "type": "string | number"
      },
      {
        "name": "onChange",
        "type": "(value: string) => void",
        "defaultValue": "() => {}"
      },
      {
        "name": "placeholder",
        "type": "string",
        "optional": true
      }
    ]
  },
  {
    "name": "Card",
    "path": "molecules/card.tsx",
    "description": "",
    "properties": [
      {
        "name": "title",
        "type": "React.ReactNode"
      },
      {
        "name": "description",
        "type": "React.ReactNode"
      }
    ]
  },
  {
    "name": "Icon",
    "path": "molecules/icon.tsx",
    "description": "Work in progress\n\n> Please don't use this component yet, it's still in development.",
    "properties": []
  }
]
```
