import { defineConfig } from 'oxlint';
import core from 'ultracite/oxlint/core';
import react from 'ultracite/oxlint/react';
import tanstack from 'ultracite/oxlint/tanstack';

export default defineConfig({
  extends: [core, react, tanstack],
  ignorePatterns: core.ignorePatterns,
  options: {
    typeAware: true,
    typeCheck: true,
  },
  rules: {
    'func-style': 'off',
    'no-nested-ternary': 'off',
    'no-use-before-define': 'off',
    'sort-keys': 'off',
    'typescript/strict-boolean-expressions': 'off',
    'unicorn/no-nested-ternary': 'off',
  },
});
