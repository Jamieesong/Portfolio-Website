import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        void: '#1a1614',
        bone: '#f5efe0',
        ink: '#2d241e',
        terra: '#cc5d33',
        rust: '#a85238',
      },
      fontFamily: {
        display: ['var(--font-syncopate)', 'sans-serif'],
        data: ['var(--font-space-mono)', 'monospace'],
        sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      borderWidth: {
        '10': '10px',
      },
      boxShadow: {
        'manifest': '6px 6px 0px #2d241e',
        'card-hover': '0 8px 24px rgba(45,36,30,0.15)',
      },
      borderRadius: {
        'card': '16px',
        'outer': '20px',
      },
    },
  },
  plugins: [],
}
export default config
