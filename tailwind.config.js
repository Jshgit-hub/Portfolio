/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Web-slinger palette (inspired-by, no trademarks)
        ink: "#0A0B12",        // page
        ink2: "#0E1220",       // panels / elevated
        line: "#1C2336",       // borders
        line2: "#252E47",      // stronger borders
        primary: "#E8EAF2",    // primary text / web thread
        secondary: "#9BA2B4",  // secondary text
        muted: "#6B7284",      // meta
        red: "#E62429",        // spider-red accent
        reddim: "#B41C20",     // deep red
        redtext: "#F5464B",    // AA-safe red for small text on ink
        blue: "#3B7BE6",       // electric-blue, used sparingly
      },
      fontFamily: {
        display: ['"Arial Black"', '"Helvetica Neue Bold"', 'Impact', '"Helvetica Neue"', 'Arial', 'sans-serif'],
        sans: ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
        mono: ['ui-monospace', 'Menlo', 'Consolas', '"Courier New"', 'monospace'],
      },
      maxWidth: {
        shell: '1120px',
        measure: '62ch',
      },
    },
  },
  plugins: [],
};
