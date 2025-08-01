/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  safelist: [
    'prose',
    'prose-invert',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

