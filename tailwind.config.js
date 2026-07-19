/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#F2EFE8",     // page
        card: "#EAE5DA",      // recessed panels
        ink: "#16130F",       // primary type
        graphite: "#4A443B",  // secondary type
        muted: "#8A8175",     // metadata
        rule: "#D8D1C2",      // hairlines
        oxide: "#B23A17",     // single accent — links, numbers, CTA
      },
      fontFamily: {
        display: ['"Instrument Serif"', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
        sans: ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.045em',
      },
      maxWidth: {
        measure: '62ch',
      },
    },
  },
  plugins: [],
};
