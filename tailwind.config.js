/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      maxWidth: {
        '1/2': '50%',
        '1/4': '25%',
        '1/3': '33.33333%',
      },
      fontFamily: {
        inter: ['Inter', 'san-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#1C64F2',
          100: '#E1EFFE',
          50: '#EBF5FF',
          200: '#C3DDFD',
          300: '#A4CAFE',
          400: '#76A9FA',
          500: '#3F83F8',
          700: '#1A56DB',
          800: '#1E429F',
          900: '#233876',
        },
      },
      borderColor: {
        primary: {
          DEFAULT: '#1C64F2',
          100: '#E1EFFE',
          50: '#EBF5FF',
          200: '#C3DDFD',
          300: '#A4CAFE',
          400: '#76A9FA',
          500: '#3F83F8',
          700: '#1A56DB',
          800: '#1E429F',
          900: '#233876',
        },
      },
      backgroundColor: {
        primary: {
          DEFAULT: '#1C64F2',
          100: '#E1EFFE',
          50: '#EBF5FF',
          200: '#C3DDFD',
          300: '#A4CAFE',
          400: '#76A9FA',
          500: '#3F83F8',
          700: '#1A56DB',
          800: '#1E429F',
          900: '#233876',
        },
      },
      boxShadow: {
        sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        DEFAULT:
          '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
        '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
        inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
        none: '0 0 rgb(0, 0 / 0, 0)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
