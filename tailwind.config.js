/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        radya: {
          navy: '#0F172A',
          blue: '#1793E8',
          sky: '#29B6F6',
          emerald: '#43D3A4',
          bg: '#F8FAFC',
        },
      },
      fontFamily: {
        sans: ['"Proxima Nova"', 'proxima-nova', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        exo: ['var(--font-exo)', 'Exo', 'sans-serif'],
        heading: ['var(--font-exo)', 'Exo', 'sans-serif'],
        body: ['"Proxima Nova"', 'proxima-nova', 'sans-serif'],
        proxima: ['"Proxima Nova"', 'proxima-nova', 'sans-serif'],
        raleway: ['var(--font-raleway)', 'Raleway', 'sans-serif'],
        quote: ['var(--font-raleway)', 'Raleway', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radya': 'linear-gradient(135deg, #1793E8 0%, #29B6F6 100%)',
        'gradient-radya-full': 'linear-gradient(135deg, #1793E8 0%, #29B6F6 50%, #43D3A4 100%)',
      },
    },
  },
  plugins: [],
};
