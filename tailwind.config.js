/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'velora-primary': '#6236FF',  // Airmeet-inspired purple
        'velora-secondary': '#36C7FF', // Light blue
        'velora-accent': '#FFB545',   // Orange accent
      },
    },
  },
  plugins: [],
}
