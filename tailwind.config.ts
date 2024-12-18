import type { Config } from 'tailwindcss'

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundColor: {
        sidebar: 'rgb(var(--sidebar) / <alpha-value>)',
        'sidebar-hover': 'rgb(var(--sidebar-hover) / <alpha-value>)',
      },
      colors: {
        yellow: {          
          default: '#FFD700',
          light: '#FFF4B8',
          dark: '#B89B00',
        },
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        card: 'var(--card)',
        'card-hover': 'var(--card-hover)',
      },
    },
  },
  plugins: [],
} satisfies Config
