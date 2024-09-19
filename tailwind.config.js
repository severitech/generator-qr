/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        customBlue: "rgb(56, 75, 112)",
        customGreen: "rgb(80, 118, 135)",
        customWithe: "rgb(252, 250, 238)",
        customRedligth: "rgb(199, 54, 89)",
        customRed: "rgb(180, 0, 1)"
      },
    },
  },
  plugins: [],
};
