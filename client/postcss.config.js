module.exports = {
  plugins: [require('tailwindcss'), require('autoprefixer')],
  safelist: [
    /^(text|bg|border)-(dixthis-|desert-|brilliance-)?(primary|secondary|grey|error|warning)-(main|dark|light|extraLight)$/,
  ],
};
