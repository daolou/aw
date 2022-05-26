/*
 * @Author: zhiguo.jzg
 * @Date: 2022-05-24 11:46:18
 * @Description: TODO: Description of file, its uses and information
 * @LastEditTime: 2022-05-26 23:02:05
 * @LastEditors: zhiguo.jzg
 */

import aw from '../lib/index.js'; // eslint-disable-line
import assert from './assert.js'; // eslint-disable-line

assert.equal(aw.input, 'TJS_ENV=test', 'it should be equal');

assert.notEqual(aw.input, 'TJS_ENV=prod', 'it should not be equal');
