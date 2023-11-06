import daisyui from 'daisyui'
import typography from '@tailwindcss/typography'
import forms from '@tailwindcss/forms'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    container: {
      padding: '2rem',
      center: true,
    },
    extend: {},
  },
  daisyui: {
    themes: ['winter'],
  },
  plugins: [typography, daisyui, forms],
}
