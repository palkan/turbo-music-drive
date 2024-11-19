const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./public/*.html",
    "./app/helpers/**/*.rb",
    "./app/javascript/**/*.{js,ts,jsx,tsx}",
    "./app/views/**/*.{erb,haml,html,slim}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        "header-1": ["56px", { lineHeight: "64px" }],
        "header-2": ["32px", { lineHeight: "40px" }],
        "header-3": ["24px", { lineHeight: "32px" }],
        "header-4": ["16px", { lineHeight: "24px" }],
        plain: ["18px", { lineHeight: "24px" }],
        small: ["16px", { lineHeight: "24px" }],
        xsmall: ["14px", { lineHeight: "20px" }],
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/container-queries"),
  ],
};
