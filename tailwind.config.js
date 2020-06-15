const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  purge: ["./src/**/*.svelte"],
  theme: {},
  variants: {},
  plugins: [require("@tailwindcss/ui")],
};
