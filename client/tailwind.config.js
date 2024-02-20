/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "10px",
        md: "50px",
      },
    },
    extend: {
      colors: {
        primary: "#140443",
        title : '#29459f',
        // secondary : '#d78553',
        secondary: "#F38550",
        color: "#504275",
        bgcolor: "#f1f5f9",
      },
      screens: {
        lg: "992px",
      },
    },
  },
  plugins: [],
};
