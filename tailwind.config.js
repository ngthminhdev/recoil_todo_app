const withMT = require("@material-tailwind/react/utils/withMT");
 
module.exports = withMT({
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  // important: '#__next',
  // corePlugins: {
  //   preflight: false,
  // },
  theme: {
    extend: {},
  },
  plugins: [],
});