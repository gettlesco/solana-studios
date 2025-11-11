/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        sol: {
          bg: '#0B0B0F',
          card: '#11121A',
          text: '#E6E6EB',
          mute: '#A1A1AA',
          edge: '#1C1D27',
          violet: '#9945FF',
          mint: '#14F195',
          aqua: '#33FFA8',
        },
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(153,69,255,0.25), 0 0 32px rgba(20,241,149,0.12)',
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Oxygen',
          'Ubuntu',
          'Cantarell',
          'Open Sans',
          'Helvetica Neue',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [],
  important: true,
};

