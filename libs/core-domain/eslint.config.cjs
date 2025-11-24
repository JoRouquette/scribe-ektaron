const baseConfig = require('../../eslint.config.cjs');
const tsParser = require('@typescript-eslint/parser');
const tsPlugin = require('@typescript-eslint/eslint-plugin');

module.exports = [
  // Règles globales (dont enforce-module-boundaries)
  ...baseConfig,

  // Spécifique à core-domain
  {
    files: ['**/*.ts'],
    ignores: ['dist/**', 'jest.config.*', '**/*.spec.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: ['./tsconfig.lib.json', './tsconfig.spec.json'],
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    linterOptions: {
      reportUnusedDisableDirectives: 'error',
    },
    rules: {},
  },
];
