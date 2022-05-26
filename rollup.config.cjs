/*
 * @Author: zhiguo.jzg
 * @Date: 2022-05-17 04:38:57
 * @Description: TODO: Description of file, its uses and information
 * @LastEditTime: 2022-05-19 22:38:12
 * @LastEditors: zhiguo.jzg
 */
const ts = require('rollup-plugin-ts');

module.exports = {
  input: 'src/index.ts',
  output: {
    dir: 'lib',
    format: 'es',
  },

  plugins: [
    ts({
      tsconfig: 'tsconfig.json',
    }),
  ],
};
