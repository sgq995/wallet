const path = require('path');

const eslint = require('eslintconfig/eslint-typescript');

module.exports = {
  ...eslint,
  overrides: [
    {
      ...eslint.overrides[0],
      parserOptions: {
        project: [path.join(__dirname, 'tsconfig.eslint.json')], // Specify it only for TypeScript files
      },
    },
  ],
};
