/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}","./dist/*.{html,js}"],
  theme: {
    extend: {
      
    },
  },
  variants: {},
  plugins: [
    require('tailwindcss-textshadow')
  ],
}

