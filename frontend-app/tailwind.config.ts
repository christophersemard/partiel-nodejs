import type { Config } from 'tailwindcss'

export default {
  content: ["./src/**/*.{html,ts}"], // Angular scanne les fichiers HTML et TypeScript
  theme: {
    extend: {
      colors: {
        primary: "#2C2C2C", // Gris anthracite chic
        secondary: "#D5BDAF", // Beige doux
        background: "#F8F8F8", // Fond blanc légèrement cassé
        text: "#333333", // Texte gris foncé
        accent: "#A68A64", // Or doux / bronze
        border: "#E0E0E0", // Gris clair pour les bordures
      },
      borderRadius: {
        xl: "12px",
      },
      boxShadow: {
        soft: "0 4px 10px rgba(0, 0, 0, 0.05)", // Ombre légère
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        serif: ["Merriweather", "serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
