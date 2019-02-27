module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/strongly-recommended',
    '@vue/standard',
    '@vue/typescript'
  ],
  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    'vue/require-default-prop': 'off',
    'vue/require-prop-types': 'off',
    'semi': [2, 'always']
  },
  parserOptions: {
    parser: '@typescript-eslint/parser'
  }
};
