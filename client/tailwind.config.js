/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "yard-blue": "#4893CC",
        "yard-orange": "#DF7E07",
        "yard-red": "#D84861",
        "yard-green": "#399349",
        "yard-yellow": "#FFD15C",
        "yard-gray": "#848484",
      },
      maxWidth: {
        "1": "10%",
        "2": "20%",
        "3": "30%",
        "4": "40%",
        "5": "50%",
        "6": "60%",
        "7": "70%",
        "8": "80%",
        "9": "90%",
      },
    },
  },
  plugins: [],
};
