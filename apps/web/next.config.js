const withTM = require('next-transpile-modules')([
  '@wallet/components',
  '@wallet/forms',
]);

module.exports = withTM({
  reactStrictMode: true,
});
