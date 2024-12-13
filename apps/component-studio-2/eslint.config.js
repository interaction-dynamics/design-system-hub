import typescriptParser from '@typescript-eslint/parser'
import js from '@eslint/js'
import reactRecommended from 'eslint-plugin-react/configs/recommended.js'
import jest from 'eslint-plugin-jest'
import tseslint from 'typescript-eslint'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'

// Following this article: https://www.raulmelo.me/en/blog/migration-eslint-to-flat-config

export default tseslint.config(
  {
    ignores: ['dist/**', 'node_modules/**'],
  },
  js.configs.recommended,
  reactRecommended,
  {
    files: ['**/*.js', '**/*.ts', '**/*.tsx'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: typescriptParser,
      globals: {
        document: 'readonly',
      },
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
    },
    settings: {
      react: {
        version: 'detect', // React version. "detect" automatically picks the version you have installed.
      },
    },
    // extends: [
    //   'eslint:recommended',
    //   'plugin:react/recommended',
    //   'plugin:prettier/recommended',
    //   'prettier',
    //   'plugin:jsx-a11y/recommended',
    //   'plugin:i18next/recommended',
    //   'plugin:i18n-json/recommended',
    //   'plugin:sonarjs/recommended',
    //   'plugin:json/recommended',
    //   'plugin:@typescript-eslint/eslint-recommended',
    //   'plugin:@typescript-eslint/recommended',
    // ],
    // plugins: [
    //   'react',
    //   'prettier',
    //   'jsx-a11y',
    //   'i18next',
    //   'sonarjs',
    //   '@typescript-eslint',
    // ],
  },
  {
    files: ['**/*.{test,spec}.tsx?'],
    ...jest.configs['flat/recommended'],
  },
  ...tseslint.configs.recommended,
  eslintPluginPrettierRecommended,
)
