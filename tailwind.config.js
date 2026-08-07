/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Neo-brutalist palette
        cream: "#FDF6E3",     // page
        paper: "#FFFFFF",     // block surfaces
        ink: "#000000",       // borders + primary type
        cobalt: "#2038E5",    // accent 1
        yellow: "#FFC53D",    // accent 2
      },
      fontFamily: {
        display: ['"Arial Black"', '"Helvetica Neue"', 'Arial', 'sans-serif'],
        mono: ['ui-monospace', 'Menlo', 'Consolas', 'monospace'],
      },
      boxShadow: {
        hard: '6px 6px 0 #000',
        'hard-sm': '4px 4px 0 #000',
      },
    },
  },
  plugins: [],
};
