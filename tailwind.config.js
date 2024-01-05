// import clapper from './src/assets/clapper.svg';
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'clapper': "url('./src/assets/clapper.svg')"
      }
    },
  },
  plugins: [],
}