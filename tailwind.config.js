/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: { ...colors, primary: colors.violet },
      spacing: { 0.2: '0.06rem' },
    },
  },
  plugins: [],
};
