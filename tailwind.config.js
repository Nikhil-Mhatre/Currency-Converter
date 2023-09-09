/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'Abril-Fatface': ['Abril Fatface', 'cursive'],
        'Hind': ['Hind', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
