/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        app: {
          100: '#FFF',
          200: '#E2EAFC',
          300: '#D7E3FC',
          400: '#CCDBFD',
          500: '#333',
          600: '#333',
          700: '#000',
          purple: '#4E54C8',
        },
      },
    },
  },
  plugins: [],
};