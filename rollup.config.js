/*
 * @Author: zhiguo.jzg
 * @Date: 2022-05-17 04:38:57
 * @Description: TODO: Description of file, its uses and information
 * @LastEditTime: 2022-05-17 10:37:51
 * @LastEditors: zhiguo.jzg
 */
import ts from 'rollup-plugin-ts';
import copy from 'rollup-plugin-copy';
import { terser } from 'rollup-plugin-terser';

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
    copy({ targets: [{ src: 'runtime/*', dest: 'lib/runtime' }] }),
    terser(),
  ],
};
