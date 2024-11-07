/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./dist/*.{html,js}",
],

  darkMode: 'false',

  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

