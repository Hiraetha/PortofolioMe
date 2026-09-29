/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        surface: {
          DEFAULT: 'var(--surface)',
          muted: 'var(--surface-muted)',
          hover: 'var(--surface-hover)',
        },
        border: 'var(--border)',
        accent: {
          DEFAULT: 'var(--accent)',
          foreground: 'var(--accent-foreground)',
          hover: 'var(--accent-hover)',
        },
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)',
        },
        success: 'var(--success)',
        warning: 'var(--warning)',
        danger: 'var(--danger)',
      },
      fontFamily: {
        sans: ['Space Grotesk', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        'brutal-sm': '2px 2px 0px var(--border)',
        'brutal': '4px 4px 0px var(--border)',
        'brutal-md': '5px 5px 0px var(--border)',
        'brutal-lg': '8px 8px 0px var(--border)',
        'brutal-hover': '2px 2px 0px var(--border)',
        'brutal-accent': '4px 4px 0px var(--accent)',
        'none': '0 0 #0000',
      },
      borderWidth: {
        '3': '3px',
      },
    },
  },
  plugins: [],
}
