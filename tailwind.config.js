import daisyui from 'daisyui'
import typography from '@tailwindcss/typography'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    container: {
      padding: '2rem',
    },
    extend: {},
  },
  daisyui: {
    themes: ['light'],
  },
  plugins: [typography, daisyui],
}
