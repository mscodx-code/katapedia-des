/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx}"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        katapedia: {
          navy: '#0A1128',
          surface: '#162036',
          border: '#233354',
          gold: '#F59E0B',
          'gold-muted': '#D97706',
          cream: '#FDFBF7',
          blue: '#1D4ED8',
          digital: '#0284C7',
          cyan: '#38BDF8'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        heading: ['Outfit', 'sans-serif'],
        script: ['Playfair Display', 'cursive', 'Georgia']
      }
    },
  },
  plugins: [],
}
