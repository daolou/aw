/*
 * @Author: zhiguo.jzg
 * @Date: 2022-05-16 23:26:05
 * @Description: TODO: Description of file, its uses and information
 * @LastEditTime: 2022-05-17 02:02:23
 * @LastEditors: zhiguo.jzg
 */
module.exports = {
  extends: ['alloy', 'alloy/typescript'],
  env: {
    // Your environments (which contains several predefined global variables)
    //
    // browser: true,
    node: true,
    // mocha: true,
    // jest: true,
    // jquery: true
  },
  globals: {
    // Your global variables (setting to false means it's not allowed to be reassigned)
    //
    // myGlobal: false
    tjs: true,
  },
  rules: {
    // Customize your rules
    // '@typescript-eslint/no-inferrable-types': 1,
    // '@typescript-eslint/triple-slash-reference': 1,
  },
};
