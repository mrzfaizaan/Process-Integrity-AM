/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['Roboto Mono', 'monospace'],
      },
      colors: {
        base: '#333333',
        surface: '#3D3D3D',
        grounding: '#1A1F2E',
        safety: '#FFCC00',
        steel: '#E0E0E0',
        divider: '#4A4A4A',
      },
    },
  },
  plugins: [],
};
