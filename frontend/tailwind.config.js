/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#26a862',
        primaryDark: '#1f8b52',
        primaryLight: '#5ccf96'
      }
    },
  },
  plugins: [],
}
