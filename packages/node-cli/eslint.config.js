import typescriptParser from '@typescript-eslint/parser'
import js from '@eslint/js'
import jest from 'eslint-plugin-jest'
import tseslint from 'typescript-eslint'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'

// Following this article: https://www.raulmelo.me/en/blog/migration-eslint-to-flat-config

export default tseslint.config(
  {
    ignores: ['dist/**', 'node_modules/**'],
  },
  js.configs.recommended,
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
      'no-console': ['error', { allow: ['warn', 'error'] }],
    },
  },
  {
    files: ['**/*.{test,spec}.tsx?'],
    ...jest.configs['flat/recommended'],
  },
  ...tseslint.configs.recommended,
  eslintPluginPrettierRecommended,
)
