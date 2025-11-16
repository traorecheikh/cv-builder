/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Dark mode backgrounds (following spec)
        'primary': '#111827',
        'secondary': '#1f2937',
        'tertiary': '#2d3748',
        // Enterprise colors from AGENT.md
        'primary-blue': '#1171B8',
        'primary-orange': '#E64922',
        'secondary-white': '#F1F5F9',
        'secondary-black': '#111827',
        // Dark mode text
        'text-primary': '#F1F5F9',
        'text-secondary': '#D1D5DB',
        'text-tertiary': '#9CA3AF',
        // Support colors (dark mode versions)
        'accent-light-blue': '#1E3A5F',
        'accent-dark-gray': '#F1F5F9',
        'accent-light-gray': '#374151',
        'accent-green': '#10B981',
        'accent-text-secondary': '#D1D5DB',
        // Background mapping
        'bg-primary': '#111827',
        'bg-secondary': '#1f2937',
        'bg-tertiary': '#2d3748',
      },
      fontFamily: {
        sans: ['Inter', 'Segoe UI', 'system-ui', 'sans-serif'],
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '20px',
        '2xl': '24px',
        '3xl': '32px',
        '4xl': '40px',
        '5xl': '48px',
      },
      boxShadow: {
        'soft': '0 2px 4px rgba(0, 0, 0, 0.1)',
        'card': '0 4px 6px rgba(0, 0, 0, 0.07)',
      },
      scale: {
        '98': '0.98',
      },
      animation: {
        'spin': 'spin 1s linear infinite',
      },
    },
  },
  plugins: [],
}
