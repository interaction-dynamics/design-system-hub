/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,ts,jsx,tsx}'],
  theme: {
    colors: {
      primary: {
        500: 'var(--primary-500)',
      },
      white: 'var(--white)',
    },
  },
  plugins: [],
}
