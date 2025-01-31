import type { Config } from 'tailwindcss';
import {heroui} from "@heroui/react";

const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/sections/**/*.{js,ts,jsx,tsx,mdx}',
    './src/layout/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"
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

      colors: {
        bgWhite: '#fff',
        black: '#000',
        grey: '#696969',
        white: '#EFEDE8',
        darkAccent: '#2F4F50',
        accent: '#5F9EA0',
        lightAccent: '#80CBC4',
        extraLightAccent: '#EFA082',
      },
    },
  },
  darkMode: "class",
  plugins: [heroui()],
};
export default config;
