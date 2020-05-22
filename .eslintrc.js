/*
 * @Date         : 2020-04-30 10:23:16
 * @LastEditors  : 曾迪
 * @LastEditTime : 2020-05-18 14:00:48
 * @FilePath     : \kaoshi\.eslintrc.js
 * @Description  : 
 */
module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    "camelcase": ["error", {"allow": ["aa_bb"]}],
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    
  }
}
