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
      boxShadow: {
        50: "5px 5px #000",
				100: "2px 2px 0px 0px rgb(0, 0, 0)",
				200: "2px 2px 0px 2px rgb(0, 0, 0)",
				300: "2px 2px 0px 2px rgb(238, 43, 105)",
			},
    },
  },
  plugins: [],
};
