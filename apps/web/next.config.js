const withTM = require('next-transpile-modules')([
  '@wallet/components',
  '@wallet/forms',
  '@wallet/utilities',
]);

module.exports = withTM({
  reactStrictMode: true,
});
