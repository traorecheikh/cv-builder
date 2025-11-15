/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-blue': '#1171B8',
        'primary-orange': '#E64922',
        'secondary-white': '#FFFFFF',
        'secondary-black': '#000000',
        'accent-light-blue': '#E8F1F8',
        'accent-dark-gray': '#2C3E50',
        'accent-light-gray': '#F5F7FA',
        'accent-green': '#27AE60',
        'accent-text-secondary': '#7F8C8D',
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
    },
  },
  plugins: [],
}
