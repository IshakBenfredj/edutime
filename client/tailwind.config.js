/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '10px',
        md: '50px',
      },
    },
    extend: {
      colors : {
        primary : '#29459f',
        secondary : '#d78553',
        bgcolor : '#f1f5f9'
      },
      screens: {
        lg: '992px',
      }
    },
  },
  plugins: [],
}