/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        white: '#ffffff',
        'ice-blue': '#f0f8ff',
        'sky-blue': '#78bdf2',
        'electric-blue': '#3b82f6',
        'royal-blue': '#2267b5',
        'navy-blue': '#0f2a4d',
        'slate-blue': '#4b5563',
        'steel-blue': '#4682b4',
        primary: '#0f2a4d', // Navy Blue as primary
        'primary-dark': '#0a1f3d',
        'primary-light': '#2267b5', // Royal Blue as light variant
        secondary: '#f0f8ff', // Ice Blue as secondary
        charcoal: '#222222',
        accent: '#78bdf2', // Sky Blue as accent
        'accent-dark': '#3b82f6',
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
      },
      fontFamily: {
        heading: ['Titillium Web', 'sans-serif'],
        body: ['Source Sans Pro', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};