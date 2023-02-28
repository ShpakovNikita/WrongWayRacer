const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'wrong-way-racer': {
          blue: '#201043'
        }
      },
      boxShadow: {
        glow: '0px 0px 25px #fff8;',
        'inner-glow': 'inset 0 0 25px #fff8;'
      },
      height: {
        '10v': '10vh',
        '20v': '20vh',
        '30v': '30vh',
        '40v': '40vh',
        '50v': '50vh',
        '60v': '60vh',
        '70v': '70vh',
        '80v': '80vh',
        '90v': '90vh',
        '100v': '100vh'
      },
      fontFamily: {
        saira: ['var(--font-saira)', 'sans-serif']
      }
    }
  },
  plugins: []
};
