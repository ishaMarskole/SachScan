/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
      },
      colors: {
        cream: '#FFFDF5',
        primary: '#FF6B6B',
        purple: '#8B5CF6',
        pink: '#F472B6',
        yellow: '#FFD93D',
        green: '#34D399',
        lavender: '#C4B5FD',
      },
      boxShadow: {
        brutal: '6px 6px 0px #000000',
        'brutal-lg': '8px 8px 0px #000000',
        'brutal-sm': '4px 4px 0px #000000',
        'brutal-pink': '6px 6px 0px #F472B6',
        'brutal-purple': '6px 6px 0px #8B5CF6',
        'brutal-green': '6px 6px 0px #34D399',
        'brutal-red': '6px 6px 0px #FF6B6B',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-2deg)' },
          '50%': { transform: 'rotate(2deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulse_fast: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        slideUp: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
      animation: {
        wiggle: 'wiggle 0.4s ease-in-out',
        float: 'float 3s ease-in-out infinite',
        'float-slow': 'float 5s ease-in-out infinite',
        scan: 'scan 1.5s ease-in-out infinite',
        slideUp: 'slideUp 0.4s ease-out forwards',
        pulse_fast: 'pulse_fast 1s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
