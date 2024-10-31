/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        main: '#64113F',
        'main-dark': '#3D0A26',
        secondary: '#F5F7DC',
        error: '#EA2B1F',
      },
    },
  },
  plugins: [],
};
