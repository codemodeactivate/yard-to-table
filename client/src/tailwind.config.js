/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'yard-blue': '#4893CC',
        'yard-orange': '#DF7E07',
        'yard-red': '#D84861',
        'yard-green': '#399349',
        'yard-yellow': '#FFD15C',
        'yard-gray': '#848484'
      }
    },
  },
  plugins: [],
}
