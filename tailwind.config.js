/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "bg-color":"#49108B",
        "primary":"#75CFC0"
      }
    },
  },
  plugins: [],
}