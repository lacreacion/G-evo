import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['var(--font-fredoka)', 'sans-serif'],
        sans: ['var(--font-outfit)', 'sans-serif'],
      },
      colors: {
        candy: {
          pink: '#ff2a85',
          orange: '#ff7b00',
          yellow: '#ffe600',
          green: '#05ffa1',
          cyan: '#00f0ff',
          purple: '#b537f2',
        },
      },
    },
  },
  plugins: [],
};

export default config;

