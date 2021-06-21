module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: 'class', // or 'media' or 'class'
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
    scrollbar: ['rounded'],
    extend: {},
  },
  plugins: [
    require('tailwind-scrollbar')
  ],
};
