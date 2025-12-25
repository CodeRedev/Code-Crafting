/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        noemi: ['Noemi', 'sans-serif'],
      },
      fontSize: {
        'xl-plus': '1.2rem',  // Custom font size between xl and 2xl
      },
    },
  },
  plugins: [],
}

module.exports = config
