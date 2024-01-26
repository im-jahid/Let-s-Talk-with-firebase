/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'nun': ['Nunito', 'sans-serif'],
        'sans': ['Open Sans', 'sans-serif'],
        'pops': ['Poppins', 'sans-serif'],
      },
      colors:{
        'primary': '#5F35F5',
      },
    },
  },
  plugins: [],
}