// eslint.config.js
// @ts-check
import js from '@eslint/js'
import nodePlugin from 'eslint-plugin-n'
import promise from 'eslint-plugin-promise'

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  js.configs.recommended,
  // Good Node.js defaults (handles ESM+CJS projects)
  ...nodePlugin.configs['flat/mixed-esm-and-cjs'],
  promise.configs['flat/recommended'],
]
