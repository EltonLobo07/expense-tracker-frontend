/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx}"
  ],
  theme: {
    extend: {
      screens: {
        'my-sm': '600px',
        "my-xsm": '460px'
      }
    },
  },
  plugins: [],
}
