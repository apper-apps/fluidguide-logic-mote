/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1e40af',
        secondary: '#64748b',
        accent: '#f59e0b',
        surface: '#f8fafc',
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444',
info: '#3b82f6',
      },
      fontFamily: {
        'display': ['Arial', 'sans-serif'],
        'body': ['Arial', 'system-ui', 'sans-serif'],
      },
      animation: {
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200px 0' },
          '100%': { backgroundPosition: 'calc(200px + 100%) 0' },
        },
      },
    },
  },
  plugins: [],
}