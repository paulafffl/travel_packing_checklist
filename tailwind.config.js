/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors');
const plugin = require('tailwindcss/plugin');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: { ...colors, primary: colors.violet },
      spacing: { 0.2: '0.06rem' },
      textShadow: {
        sm: '1px 1px 0px var(--tw-shadow-color)',
        DEFAULT: '2px 2px 0px var(--tw-shadow-color)',
        lg: '3px 3px 3px var(--tw-shadow-color)',
      },
      boxShadow: {
        '3xl': '0 7px 20px rgba(0, 0, 0, 0.3)',
      },
    },
  },
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'text-shadow': (value) => ({
            textShadow: value,
          }),
        },
        { values: theme('textShadow') },
      );
    }),
  ],
};
