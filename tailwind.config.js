// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      animation: {
        fade: "fade 8s ease-in-out infinite",
        slideUp: "slideUp 0.7s ease-in-out",
      },
      keyframes: {
        fade: {
          "0%,100%": { opacity: 0 },
          "50%": { opacity: 1 },
        },
        slideUp: {
          "0%": { opacity: 0, transform: "translateY(20px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
