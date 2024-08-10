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

Once you have run `dshub pull` and have the file `src/tailwind.css` in your project, you can set up tailwind to use CSS variables automatically.

```ts
// tailwind.config.js

import { generateTailwindConfig } from '@design-system-hub/tailwind'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,ts,jsx,tsx}'],
  theme: {
    extends: generateTailwindConfig(),
  },
  plugins: [],
}
```
