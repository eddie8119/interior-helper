/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundColor: {
        sidebar: 'var(--sidebar)',
      },
      colors: {
        main: {
          DEFAULT: 'var(--main)',
          light: 'var(--main-light)',
          dark: 'var(--main-dark)',
        },
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        card: 'var(--card)',
        'card-hover': 'var(--card-hover)',
        border: 'var(--border)',
        icon: 'var(--icon)',
        'gray-button': 'var(--gray-button)',
      },
    },
  },
  plugins: [],
}
