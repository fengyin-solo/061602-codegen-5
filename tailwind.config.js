/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'forest-dark': '#1a472a',
        'forest': '#2d5a3d',
        'forest-light': '#4a7c59',
        'nest-brown': '#8B4513',
        'nest-light': '#A0522D',
        'berry-red': '#C41E3A',
        'berry-blue': '#4169E1',
        'berry-gold': '#FFD700',
        'sky-blue': '#87CEEB',
        'sunny-yellow': '#FFD700',
      },
      fontFamily: {
        'display': ['"ZCOOL KuaiLe"', '"Ma Shan Zheng"', 'cursive', 'serif'],
        'body': ['"Noto Sans SC"', '"PingFang SC"', 'sans-serif'],
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'rain': 'rain 1s linear infinite',
        'snow': 'snow 3s linear infinite',
        'breath': 'breath 2s ease-in-out infinite',
        'hatch': 'hatch 0.5s ease-in-out',
        'pop-in': 'popIn 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 5px 2px rgba(255, 215, 0, 0.4)' },
          '50%': { boxShadow: '0 0 15px 5px rgba(255, 215, 0, 0.8)' },
        },
        rain: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        snow: {
          '0%': { transform: 'translateY(-10%) translateX(0)' },
          '100%': { transform: 'translateY(110vh) translateX(20px)' },
        },
        breath: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.03)' },
        },
        hatch: {
          '0%': { transform: 'scale(1) rotate(0deg)' },
          '25%': { transform: 'scale(1.1) rotate(-5deg)' },
          '50%': { transform: 'scale(1.2) rotate(5deg)' },
          '75%': { transform: 'scale(1.15) rotate(-3deg)' },
          '100%': { transform: 'scale(1) rotate(0deg)' },
        },
        popIn: {
          '0%': { transform: 'scale(0)', opacity: '0' },
          '60%': { transform: 'scale(1.2)', opacity: '1' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
