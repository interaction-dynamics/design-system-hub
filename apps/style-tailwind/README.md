# @design-system-hub/tailwind

## Installation

```bash
npm install @design-system-hub/tailwind
# or
yarn add @design-system-hub/tailwind
# or
pnpm add @design-system-hub/tailwind
```

## Usage

This package is designed to work with the [dshub](../node-cli/README.md) CLI tool.

1. Run `dshub pull` in your project. It will generate the file `src/tailwind.css`.

2. Import the file `src/tailwind.css` your index.ts

```ts
// in your index.ts

import './tailwind.css`
```

Then you can override the tailwind config with the generated tokens.

```ts
// in your tailwind.config.js

import { generateTailwindConfig } from '@design-system-hub/tailwind'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,ts,jsx,tsx}'],
  theme: generateTailwindConfig(),
  plugins: [],
}
```

You can find an example in [with-tokens-tailwind](../../examples/with-tokens-tailwind).

```

```
