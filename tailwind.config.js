/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        "2xl": "1720px", // Add your custom breakpoint
      },
      colors: {
        primary: "#a71e1e",
        secondary: "text-linear-gradient(to right, #edf71f, #f18119)", // This makes `text-green` valid
      },
      textShadow: {
        sm: "1px 1px 3px rgba(0, 0, 0, 0.3)",
        md: "2px 2px 4px rgba(0, 0, 0, 0.5)",
        lg: "3px 3px 6px rgba(0, 0, 0, 0.7)",
      },
    },
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        ".border-secondary": {
          position: "relative",
          borderRadius: "9999px", // Fully rounded border
          padding: "7px", // Border thickness effect
          background: "linear-gradient(180deg, #DCBD20 0%, #DF861E 100%)",
          boxShadow:
            "0 0 15px rgba(22, 22, 21, 0.7), 0 0 25px rgba(27, 26, 26, 0.6)",
        },
        ".border-secondary > div": {
          borderRadius: "inherit",
          backgroundColor: "white", // Inner background color
          width: "100%",
          height: "100%",
        },
      });
    },
    function ({ addUtilities }) {
      addUtilities({
        ".text-secondary": {
          background:
            "linear-gradient(90deg, rgba(237, 247, 31, 0.75) 0%, rgba(241, 129, 25, 0.75) 142.16%)",
          "-webkit-background-clip": "text",
          "-webkit-text-fill-color": "transparent",
        },
      });
    },
  ],
};
