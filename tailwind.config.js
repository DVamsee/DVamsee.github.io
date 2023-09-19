/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}","./dist/*.{html,js}"],
  theme: {
    extend: {
      textShadow: {
        'neon': '0 0 10px #00ff00, 0 0 20px #00ff00, 0 0 30px #00ff00, 0 0 40px #00ff00',
      },
    },
  },
  variants: {},
  plugins: [
    require('tailwindcss-textshadow')
  ],
}

