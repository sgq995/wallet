const withTM = require('next-transpile-modules')([
  '@wallet/components',
  '@wallet/form-store',
  '@wallet/forms',
  '@wallet/utilities',
]);

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  modularizeImports: {
    '@mui/material': {
      transform: '@mui/material/{{member}}',
    },
    '@mui/icons-material': {
      transform: '@mui/icons-material/{{member}}',
    },
    lodash: {
      transform: 'lodash/{{member}}',
    },
  }
};

module.exports = withBundleAnalyzer(withTM(nextConfig));
