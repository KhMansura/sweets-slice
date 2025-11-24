// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     "./src/**/*.{js,jsx,ts,tsx}",
//   ],
//   theme: {
//     extend: {
//       colors: {
//         primary: '#E87A7A',
//         secondary: '#F9D7B9',
//         accent: '#6B4F4F',
//         background: '#FFF9F5',
//       },
//     },
//   },
//   plugins: [require("daisyui")],
// };

// module.exports = {
// content: ["./src/**/*.{js,jsx,ts,tsx}"],
// theme: { extend: {} },
// plugins: [],
// }
// /** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "dark", "cupcake"],
  },
}
