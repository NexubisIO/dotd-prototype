/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        bounce200: 'bounce 0.6s infinite 200ms',
        bounce400: 'bounce 0.6s infinite 400ms',
      },
      keyframes: {
        bounce: {
          '0%, 100%': { transform: 'translateY(-25%)' },
          '50%': { transform: 'none' },
        },
      },
    },
  },
  plugins: [],
}

