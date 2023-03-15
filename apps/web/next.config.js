const withTM = require('next-transpile-modules')([
  '@wallet/components',
  '@wallet/form-store',
  '@wallet/forms',
  '@wallet/utilities',
]);

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer(
  withTM({
    reactStrictMode: true,
  })
);
