module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Basic
        "white": "#fff",
        // Custom
        "c-gray": "#2f314b",
        "c-dark-gray": "#191919",
        "c-dark-blue": "#0f172a",
        "c-light-purple": "#8173ff",
        "c-black": "#121212"
      }
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    styled: true,
    themes: [
      {
        auax: {
          "primary": "#f3f4f6",
          "secondary": "#dadada",
          "accent": "#3b82f6",
          "neutral": "#0D121D",
          "base-100": "#0F1729",
          "info": "#0CA6E9",
          "success": "#10b981",
          "warning": "#F4C152",
          "error": "#FB6F84",
        },
      },
      "dracula",
      "synthwave",
      "halloween",
      "lofi",
      "coffee",
      "night"
    ],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
    darkTheme: "dark",
  },
}
