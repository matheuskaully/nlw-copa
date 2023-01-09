/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.tsx'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: 'Roboto, sans-serif',
      },

      backgroundImage: {
        app: 'url(/app-bg.png)'
      },

      colors: {
        ignite: {
          500: '#129E57'
        },
        yellow: {
          300: '#ECD865',
          500: '#F7DD43',
        },
        gray: {
          100: '#E1E1E6',
          300: '#8D8D99',
          600: '#32323B',
          800: '#202024',
          900: '#121214',
        }
      }
    },
  },
  plugins: [],
}