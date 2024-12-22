/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary : "#3D52A0",
        secondary : "#8697C4",
        card : "#7091E6",
        home: "#ADBBDA"
      }
    },
  },
  plugins: [],
}