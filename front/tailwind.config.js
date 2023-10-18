/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      height: {
        "modal-h": "calc(100vh - 20px)",
      },
    },
  },
  plugins: [],
};
