module.exports = {
  // Tailwind ne génère que les classes trouvées dans ces fichiers.
  content: ["views/**/*.njk", "static/**/*.js"],
  theme: {
    extend: {
      screens: {
        sm: "640px",
        // => @media (min-width: 640px) { ... }

        md: "768px",
        // => @media (min-width: 768px) { ... }

        lg: "1024px",
        // => @media (min-width: 1024px) { ... }

        xl: "1280px",
        // => @media (min-width: 1280px) { ... }
      },
      colors: {
        "popcorn-yellow": "#f0d37a",
        "popcorn-red": "#d22321",
      },
    },
  },
  plugins: [],
};
