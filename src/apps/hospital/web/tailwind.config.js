/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        main: '#9747FF',
        disabled: '#E5D5FB',
        background: '#F5F5F5',
        highlight: '#FFFFFF',
        dark: '#000000',
        opaque: '#3E3E3E',
        alert: '#DE2AC3',
        warning: '#EA3A3D',
      },
      gridTemplateColumns: {
        main: '250px auto',
      },
    },
  },
  plugins: [],
};
