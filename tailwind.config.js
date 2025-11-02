/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#FFDD00', // Yellow
        secondary: '#0D0C22', // Black
        accent: '#FFFFFF', // White
      },
    },
  },
  plugins: [],
};
