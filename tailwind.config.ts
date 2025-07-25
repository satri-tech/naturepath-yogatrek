import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./layouts/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        bakcgroundLight: "#fcfcfc",
        backgroundDark: "#121212",
        // primary: "#4338ca",
        // secondary: "#ea580c",
        // primary: "#98FB98",
        primary: "#15803d",
        secondary: "#FFD280",
        "yoga-blue": "#0d6efd",
        "yoga-red": "#dc3545",
        "yoga-yellow": "#ffc107",
        "yoga-green": "#198754",
        "yoga-purple": "#6610f2",
        "yoga-light-blue": "#0d6efd",
        "yoga-pink": "#d63384",
        "yoga-orange": "#fd7e14",
        "bg-white": "#f5f5f5",
        //dark below
        "text-dark": "rgba(255, 255, 255, .8)",
        "black-dark": "rgba(26, 28, 30)",
        "gray-dark": "rgba(37, 39, 41)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;

export default config;
