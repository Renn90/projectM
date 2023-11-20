/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        lt: '350px',
        sm: '480px',
        md: '768px',
        lg: '976px',
        xl: '1440px',
        "max-w-xl": "1080px",
      },
      colors: {
       primary: '#022B3A',
       secondary: '#1F7A8C',
       grey: '#E1E5F2',
       white: '#FFFFFF'
    },
    },
  },
  plugins: [],
}