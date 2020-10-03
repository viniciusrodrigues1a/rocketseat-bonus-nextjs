/* eslint-disable */
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
    'airbnb',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
    'react/prop-types': 'off', // Disable prop-types as we use TypeScript for type checking
    'react/react-in-jsx-scope': 'off', // needed for NextJS's jsx without react import
    'react/jsx-filename-extension': [1, { extensions: ['.tsx'] }],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'import/prefer-default-export': 'off',
    'import/extensions': 'off',
    'import/no-unresolved': 'error',
    'react/jsx-props-no-spreading': 'off',
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      // use <root>/tsconfig.json
      typescript: {
        // always try to resolve types under `<root>@types` directory even it doesn't contain any source code, like `@types/unist`
        alwaysTryTypes: true,
      },

      // use <root>/path/to/folder/tsconfig.json
      typescript: {
        project: 'path/to/folder',
      },

      // Multiple tsconfigs (Useful for monorepos)

      // use a glob pattern
      typescript: {
        project: 'packages/*/tsconfig.json',
      },

      // use an array
      typescript: {
        project: [
          'packages/module-a/tsconfig.json',
          'packages/module-b/tsconfig.json',
        ],
      },

      // use an array of glob patterns
      typescript: {
        project: ['packages/*/tsconfig.json', 'other-packages/*/tsconfig.json'],
      },
    },
  },
};
