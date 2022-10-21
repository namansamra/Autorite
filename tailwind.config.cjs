/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  corePlugins: {
    preflight: false,
  },
  theme: {
    colors: {
      primary: {
        DEFAULT: '#1a655e',
        50: '#ddf6f4',
        100: '#9ae5de',
        200: '#83dfd6',
        300: '#6dd9cf',
        400: '#57d3c7',
        500: '#40cdc0',
        600: '#32bfb2',
        700: '#2ca89d',
        800: '#269288',
        900: '#207c73',
        1000: '#1a655e',
      },
      whiteSmoke: '#F6F6F6',
      white: '#FFF',
      transparent: 'transparent',
      grey: {
        DEFAULT: '#475467',
        50: '#F9FAFB',
        100: '#F2F4F7',
        200: '#E4E7EC',
        400: '#98A2B3',
        500: '#667085',
        600: '#475467',
        700: '#344054',
        800: '#1D2939',
        900: '#101828',
      },
      status: {
        active: '#ABE263',
        dormant: '#F79009',
        strikeOff: '#FEDF89',
        notExist: '#A9A9A9',
        closed: '#F04438',
      },
    },
    extend: {
      fontFamily: {
        inter: ['Inter', ...defaultTheme.fontFamily.sans],
      },
    },
  },
};
