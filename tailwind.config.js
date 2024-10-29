/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      container: {
        center: true,
        padding: "15px",
      },
      colors: {
        spotifyGreen: "#1DB954",
        spotifyBlack: "#191414",
        spotifyDarkGray: "#121212",
        spotifyLightGray: "#535353",
        spotifyWhite: "#FFFFFF",
        spotifyPink: "#E91429",
        spotifyBlue: "#1E3264",
      },
    },
  },
  plugins: [],
};
