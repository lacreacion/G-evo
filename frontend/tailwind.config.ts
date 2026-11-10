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
        'forest-deep': '#042419',
        'forest-base': '#05281C',
        'forest-cloud': '#0A3C2A',
        'forest-center': '#0E4D36',
        'forest-highlight': '#0F523A',
        'forest-edge': '#02140E',
        'soft-mint': '#E5F8EF',
        'soft-warm-white': '#FAFDFB',
        'soft-cream': '#FFF6DE',
        'sage-border': '#BCE0CC',
        'icon-box-mint': '#DDF8EC',
        'icon-emerald': '#157A54',
        'charcoal-title': '#2C3531',
        'slate-subtitle': '#6E7873',
        'lavender-arrow': '#A389F4',
        'satin-emerald': '#007A53',
        'jade-glow': '#17A575',
        'jade-border': '#22C58B',
      },
      boxShadow: {
        'soft-slot': 'inset 0 3px 6px rgba(20, 80, 50, 0.08)',
        'soft-slot-deep': 'inset 0 3px 6px rgba(20, 80, 50, 0.10)',
        'satin-emerald-hover':
          '0 12px 30px -4px rgba(23, 165, 117, 0.75), 0 0 20px 4px rgba(0, 122, 83, 0.6), inset 0 2px 4px rgba(255, 255, 255, 0.9)',
      },
    },
  },
  plugins: [],
};

export default config;
