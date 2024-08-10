import { generateTailwindConfig } from '@design-system-hub/tailwind'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,ts,jsx,tsx}'],
  theme: {
      ...generateTailwindConfig()
  },
  plugins: [],
}
