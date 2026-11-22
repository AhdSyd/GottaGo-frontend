/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Bricolage Grotesque"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['"Public Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        // Landing page: The Line.
        signal: ['"Schibsted Grotesk"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        plate: ['"Familjen Grotesk"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Directory-board paper: cool pale grey-green, not warm cream.
        paper: {
          DEFAULT: '#EDEFE8',
          raised: '#F6F7F2',
          sunk: '#E3E5DC',
        },
        // Deep pine ink, not a tinted near-black.
        ink: {
          DEFAULT: '#16241D',
          soft: '#3C4C44',
          muted: '#6B7A73',
          line: '#CBD2C8',
        },
        // The one loud thing: a clearance-sticker red.
        markdown: {
          DEFAULT: '#C8102E',
          deep: '#A00C24',
        },
        // The Line: enamel ground, ink, and exactly three line colors.
        enamel: { DEFAULT: '#F6F6F2', deep: '#ECECE5' },
        rail: {
          ink: '#0E0F12',
          soft: '#3B3E45',
          muted: '#5E626B',
          rule: '#D6D6CE',
          scottsdale: '#E8431B',
          tempe: '#F5B300',
          chandler: '#1F63E0',
        },
        // Wayfinding teal for the map / secondary signals.
        wayfind: {
          DEFAULT: '#2C6E63',
          soft: '#DCE8E3',
        },
      },
      borderRadius: { tag: '2px' },
    },
  },
  plugins: [],
};
