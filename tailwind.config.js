/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#4ADDCA',
        'light-blue': '#8F9BBA',
        'lighter-blue': '#919EAB',
        'secondary': '#0C2B47',
        'primary-light': '#E7FFFC',
        'red': '#FF2C2C'
      },
      spacing: {
        'inline-space': '32px',
        normal: '2rem',
        mini: '1rem'
      },
      fontSize: {
        32: '32px'
      },
      fontWeight: {
        700: 700
      },
      borderRadius: {
        40: '40px'
      },
      borderWidth: {
        1: '1px'
      },
      boxShadow: {
        card: '0px 12px 24px -4px #919EAB1F',
        'border-shadow': '0px 1px 2px 0px #919EAB29',
        'popover': '-20px 20px 40px -4px #919EAB3D',
        'small-shadow': '0px 1px 2px 0px #0000000D'
      }
    },
  },
  plugins: [],
}