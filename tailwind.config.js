module.exports = {
  content: [
    "app.vue",
    // Add all files that contain Tailwind classes
    // e.g. './modules/**/*.{vue,js,ts}',
  ],
  safelist: [],
  theme: {},
  plugins: [
    require("@tailwindcss/forms"),
  ],
};
