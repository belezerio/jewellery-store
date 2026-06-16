/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'isya-green': '#0b3c2a',
        'isya-green-dark': '#05251a',
        'isya-gold': '#b39359',
        'isya-gold-light': '#e6c89c',
        'isya-sand': '#faf8f5',
        'isya-sand-dark': '#eae1d8',
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'serif'],
        sans: ['Outfit', 'sans-serif'],
        script: ['Alex Brush', 'cursive'],
      }
    },
  },
  plugins: [],
}

