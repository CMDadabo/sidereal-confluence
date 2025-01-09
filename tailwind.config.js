/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      body: ["Enigmatic", "sans-serif"],
      sans: ["Enigmatic", "sans-serif"],
      heading: "Enigmatic Bold, sans-serif",
    },
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      transitionDuration: {
        3000: "3000ms",
      },
      colors: {},
    },
  },
  plugins: [require("tailwindcss-animate")],
};
