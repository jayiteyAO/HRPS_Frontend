/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        microsoft: {
          'orange-red': '#F25022',
          'blue': '#00A4EF',
          'yellow': '#FFB900',
          'green': '#7FBA00',
          'gray': '#737373',
          // Additional Microsoft-associated colors
          'dark-blue': '#0067B8',
          'light-gray': '#F2F2F2',
          'teal': '#008272',
          'purple': '#7A209A',
        },
      },
    },
  },
  plugins: [],
}
