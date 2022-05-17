/*
 * @Author: zhiguo.jzg
 * @Date: 2022-05-17 04:38:57
 * @Description: TODO: Description of file, its uses and information
 * @LastEditTime: 2022-05-18 00:58:00
 * @LastEditors: zhiguo.jzg
 */
import ts from 'rollup-plugin-ts';

export default {
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
