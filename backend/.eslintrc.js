module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true
  },
  extends: ['standard', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 12
  },
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
    'space-before-function-paren': 'off'
  }
}
