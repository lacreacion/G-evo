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
        sans: ['"Plus Jakarta Sans"', '"Inter"', 'system-ui', 'sans-serif'],
      },
      colors: {
        'gevo-bg-deep': '#0B191E',
        'gevo-bg-glow': '#12262D',
        'gevo-chassis': '#1C2427',
        'gevo-header': '#38666E',
        'gevo-key-idle': '#263438',
        'gevo-key-idle-top': '#2E3E42',
        'gevo-key-active': '#64D2DF',
        'gevo-key-active-top': '#7CE8F5',
        'gevo-text-ice': '#F0F7F8',
      },
      boxShadow: {
        'keycap-idle':
          '-4px 6px 12px rgba(0, 0, 0, 0.65), inset 1px 1px 0px rgba(255, 255, 255, 0.18), inset -2px -3px 4px rgba(0, 0, 0, 0.5)',
        'keycap-active':
          '-6px 10px 18px rgba(0, 0, 0, 0.75), 0 0 20px rgba(100, 210, 223, 0.55), inset 1px 1px 1px rgba(255, 255, 255, 0.6)',
      },
    },
  },
  plugins: [],
};

export default config;
