// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#111111",
          dark: "#111111",
          light: "#A8E6D4",
        },
        'gradient-start': '#a855f7',
        'gradient-middle': '#6366f1',
        'gradient-end': '#3b82f6',

        'gradient-email-1': '#FF5733',
        'gradient-email-2': '#FFBD33',

        'gradient-linkedin-1': '#0077B5',
        'gradient-linkedin-2': '#00A0DC',

        'gradient-upwork-1': '#14A800',
        'gradient-upwork-2': '#56C02C',

        'gradient-github-1': '#333',
        'gradient-github-2': '#6e5494',
        accent: "#F5F7F8",
        base: "#45474B",
      },
      animation: {
        'gradient-text': 'gradient 6s ease-in infinite', // Updated for consistency with your example
        'bounce-slow': 'bounce 1.5s infinite',
        'border-wave': 'wave 6s ease-in infinite', // MODIFIED: Duration and timing function
      },
      keyframes: {
        'gradient': { // This is your existing keyframe for text, now potentially reused
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' }, // Ensures it goes back and forth
        },
        bounce: {
          '0%, 20%, 50%, 80%, 100%': { transform: 'translateY(0)' },
          '40%': { transform: 'translateY(-10px)' },
          '60%': { transform: 'translateY(-5px)' },
        },
        'wave': { // MODIFIED: Matches your 'gradient' keyframe structure for back-and-forth
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
};