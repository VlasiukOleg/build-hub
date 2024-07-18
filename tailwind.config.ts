import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/sections/**/*.{js,ts,jsx,tsx,mdx}',
    './src/layout/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      sm: '480px',
      smOnly: { max: '767px' },
      md: '768px',
      mdOnly: { max: '1279px' },
      xl: '1280px',
    },
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '1rem',
          md: '34px',
          xl: '2rem',
        },
      },
      fontFamily: {
        unbounded: ['var(--font-unbounded)'],
        inter: ['var(--font-inter)'],
      },
      colors: {
        bgBlack: '#040404',
        white: '#EFEDE8',
        accent: '#E6533C',
        lightAccent: '#EF8964',
        extraLightAccent: '#EFA082',
      },
    },
  },
  plugins: [],
};
export default config;
