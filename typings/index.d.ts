/*
 * @Author: zhiguo.jzg
 * @Date: 2022-05-17 02:08:10
 * @Description: TODO: Description of file, its uses and information
 * @LastEditTime: 2022-05-19 23:54:01
 * @LastEditors: zhiguo.jzg
 */
declare namespace tjs {
  const args: string[];
  const platform: 'darwin' | 'win32' | 'linux';
  const getenv: (key: string) => string;
}
