/*
 * @Author: zhiguo.jzg
 * @Date: 2022-05-17 04:38:57
 * @Description: TODO: Description of file, its uses and information
 * @LastEditTime: 2022-05-17 14:24:49
 * @LastEditors: zhiguo.jzg
 */
import ts from 'rollup-plugin-ts';
// import { terser } from 'rollup-plugin-terser';

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
    // terser(),
  ],
};
