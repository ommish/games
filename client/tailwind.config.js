const theme = require('./src/styles/theme');

function makeColors() {
  const colors = {};
  Object.keys(theme.colors.main).forEach(group => {
    colors[group] = theme.colors.main[group];
  });
  Object.keys(theme.colors.dixthis).forEach(group => {
    colors[`dixthis-${group}`] = theme.colors.dixthis[group];
  });
  Object.keys(theme.colors.desert).forEach(group => {
    colors[`desert-${group}`] = theme.colors.desert[group];
  });
  return colors;
}

module.exports = {
  future: {},
  purge: ['./src/**/*.tsx', './src/styles/util.ts'],
  corePlugins: {
    fontFamily: false,
    container: false,
    appearance: false,
    backgroundAttachment: false,
    clear: false,
    fontSmoothing: false,
    rotate: false,
    scale: false,
    skew: false,
    tableLayout: false,
    translate: false,
    userSelect: false,
  },
  theme: {
    extend: {
      colors: makeColors(),
    },
  },
  variants: {},
  plugins: [],
};
