module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        qsand: ["Quicksand", "sans-serif"],
      },
      backgroundImage: (select) => ({
        arrow: "url('/src/assets/fundoSelect.png')",
      }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
