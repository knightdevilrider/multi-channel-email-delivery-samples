/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'neon-blue': '#4169E1',
        'neon-magenta': '#FF007A',
        'cyber-silver': '#C0C0C0',
        'dark-bg': '#0a0a0a',
        'card-bg': 'rgba(255, 255, 255, 0.05)',
      },
      fontFamily: {
        'montserrat': ['Montserrat', 'sans-serif'],
      },
      animation: {
        'pulse-neon': 'pulse-neon 2s infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'particle': 'particle 4s linear infinite',
      },
      keyframes: {
        'pulse-neon': {
          '0%, 100%': { 
            boxShadow: '0 0 20px #4169E1, 0 0 40px #4169E1, 0 0 60px #4169E1',
            transform: 'scale(1)'
          },
          '50%': { 
            boxShadow: '0 0 30px #FF007A, 0 0 60px #FF007A, 0 0 90px #FF007A',
            transform: 'scale(1.05)'
          },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'glow': {
          'from': { textShadow: '0 0 20px #4169E1' },
          'to': { textShadow: '0 0 30px #FF007A, 0 0 40px #FF007A' },
        },
        'particle': {
          '0%': { transform: 'translateY(100vh) rotate(0deg)', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { transform: 'translateY(-100vh) rotate(360deg)', opacity: '0' },
        },
      },
      backdropBlur: {
        'xs': '2px',
      },
    },
  },
  plugins: [],
};