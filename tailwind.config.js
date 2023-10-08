/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        lightGrayy: "#CDCDCD",
        gray: "#FFFFFF",
        layoutGray: "#F3F0EE",
        LightPecanPine: "#F1EBE3",
        midGray: "#A5A5A5",
        lightYellow: "#C19008",
        darkGray: "#2B2B2B",
        darkGreen: "#587052",
        redError: "#FFEBEB",
        greenSuccess: "#C3F9C2",
        prestigeGreen: "#17494D",
        orangeWarn: "#FFE4C1",
        darkYellow: "#C38F00",
        disable: "#A89F87",
        Zappy_Zebra: "#f8f9f9",
      },
      fontFamily: {
        vaziri: ["Vazirmatn"],
      },
      boxShadow: {
        'top-xl': "0px -2px 8px 0px rgba(0, 0, 0, 0.12);"
      },
    },
  },
  plugins: [],
};
