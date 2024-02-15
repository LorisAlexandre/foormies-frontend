import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          "50": "#f6f8f5",
          "100": "#eaf0e8",
          "200": "#d5e1d1",
          "300": "#b4c8ad",
          "400": "#8ba781",
          "500": "#6a895e",
          "600": "#546f4a",
          "700": "#495f41",
          "800": "#384833",
          "900": "#2f3c2b",
          "950": "#161f14",
        },
      },
      fontFamily: {
        montserrat: ["var(--font-montserrat)"],
        playfair: ["var(--font-playfair)"],
      },
      fontSize: {
        sm: "10px",
        base: "17px",
        xl: "29px",
        "2xl": "50px",
        "3xl": "84px",
      },
    },
  },
  plugins: [],
};
export default config;
