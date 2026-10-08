/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'signal-yellow': '#ffe600',
        'globe-azure': '#007fff',
        'roof-coral': '#ef3b2c',
        'charcoal-ink': '#333333',
        'cloud-white': '#ffffff',
      },
      fontFamily: {
        'display': ['"Changa One"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        'sans': ['"Space Grotesk"', 'Arial', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '10': '10px',
        '20': '20px',
        '45': '45px',
      },
      borderRadius: {
        'none': '0px',
        'full': '1440px',
      },
      lineHeight: {
        'stacked': '0.72',
        'stacked-sm': '0.80',
      }
    },
  },
  plugins: [],
}
