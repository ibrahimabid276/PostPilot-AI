/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#F2F4F5",
        "background-secondary": "#E7ECEC",
        primary: "#155C84",
        "primary-light": "#2C97B8",
        dark: "#24373A",
        "dark-text": "#182324",
        white: "#FFFFFF",
        success: "#2FAF7A",
        warning: "#F2A93B",
        error: "#E15A5A",
        // Dark mode equivalents
        "dark-bg": "#0D1A1F",
        "dark-surface": "#1A2B32",
        "dark-text-light": "#E7ECEC",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};