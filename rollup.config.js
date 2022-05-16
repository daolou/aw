/*
 * @Author: zhiguo.jzg
 * @Date: 2022-05-17 04:38:57
 * @Description: TODO: Description of file, its uses and information
 * @LastEditTime: 2022-05-17 05:15:13
 * @LastEditors: zhiguo.jzg
 */
import ts from 'rollup-plugin-ts';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/index.ts',
  output: {
    file: 'lib/index.js',
    format: 'es',
  },

  plugins: [
    ts({
      tsconfig: 'tsconfig.json',
    }),
    terser(),
  ],
};
