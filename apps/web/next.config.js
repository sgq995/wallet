const withTM = require('next-transpile-modules')(['ui', 'forms']);

module.exports = withTM({
  reactStrictMode: true,
});
