/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        "black-100": "#22283180",
        "black-200": "#22283166",
        "black-300": "#00000080",
        "black-400": "#0C0C0C",
        "black-500": "#000000d9",
        "black-600": "#686D76",
        "white-100": "#f0f0f0",
        "disable-100": "#f8d7d1",
        "primary-100": "#be2719b3",
      },
      backgroundImage: {
        loader: "url('/src/Assets/Icons/logo_full.svg')",
      },
      keyframes: {
        loader: {
          "0%": {
            transform: "rotate(0deg)",
          },
          "50%": {
            transform: "rotate(180deg)",
          },
          "100%": {
            transform: "rotate(360deg)",
          },
        },
      },
    },
  },
  plugins: [
    require("daisyui"),
    function ({ addVariant, e }) {
      addVariant("peer-checked", ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.peer:checked ~ .${e(
            `peer-checked${separator}${className}`
          )}`;
        });
      });
    },
  ],
  daisyui: {
    themes: [
      {
        basic: {
          primary: "#BE2619",
          // "secondary": "#f6d860",
          accent: "#222831",
          // "neutral": "#3d4451",
          "base-100": "#EEE",
        },
      },
    ],
  },
};
