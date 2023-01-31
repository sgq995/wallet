const withTM = require('next-transpile-modules')([
  '@wallet/components',
  '@wallet/form-store',
  '@wallet/forms',
  '@wallet/utilities',
]);

module.exports = withTM({
  reactStrictMode: true,
});
