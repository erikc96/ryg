/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      navGreen: "#73BA75",
      green: "#78B158",
      yellow: "#FFCD4C",
      red: "#BF1830"
    }
  },
  safelist: ['bg-green', 'bg-yellow', 'bg-red']
}
