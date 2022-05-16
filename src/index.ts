/*
 * @Author: zhiguo.jzg
 * @Date: 2022-05-16 23:51:14
 * @Description: TODO: Description of file, its uses and information
 * @LastEditTime: 2022-05-17 04:20:16
 * @LastEditors: zhiguo.jzg
 */
import axios from './utils/redaxios';
import { ScriptFilterItem, OutputOptions } from './types/index';

const aw = {
  input: Array.from(tjs.args).pop() as string,
  getEnv: _getEnv,
  output: (items: ScriptFilterItem[], opt?: OutputOptions) => {
    console.log(JSON.stringify({ items, rerun: opt?.rerunInterval }, null, '\t'));
  },
  matches: <T extends string[] | ScriptFilterItem[]>(
    input: string,
    list: T,
    target?: string | ((item: string | ScriptFilterItem, input: string) => boolean),
  ): T => {
    const inputRaw = input.toLowerCase().normalize();

    // @ts-ignore: Unreachable code error
    return list.filter((listItem) => {
      if (typeof target === 'string') {
        // eslint-disable-next-line no-param-reassign
        listItem = listItem?.[target];
      }

      if (typeof listItem === 'string') {
        // eslint-disable-next-line no-param-reassign
        listItem = listItem.toLowerCase().normalize();
      }

      if (typeof target === 'function') {
        return target(listItem, inputRaw);
      }

      return listItem.includes(inputRaw);
    });
  },
  inputMatches: <T extends string[] | ScriptFilterItem[]>(
    list: T,
    target?: string | ((item: string | ScriptFilterItem, input: string) => boolean),
  ): T => aw.matches(aw.input, list, target),
  fetch: axios,
  icon: {
    get: _getIcon,
    info: _getIcon('ToolbarInfo'),
    warning: _getIcon('AlertCautionIcon'),
    error: _getIcon('AlertStopIcon'),
    alert: _getIcon('Actions'),
    like: _getIcon('ToolbarFavoritesIcon'),
    delete: _getIcon('ToolbarDeleteIcon'),
  },
  meta: {
    name: _getAlfredEnv('workflow_name'),
    version: _getAlfredEnv('workflow_version'),
    uid: _getAlfredEnv('workflow_uid'),
    bundleId: _getAlfredEnv('workflow_bundleid'),
  },
  alfred: {
    version: _getAlfredEnv('version'),
    theme: _getAlfredEnv('theme'),
    themeBackground: _getAlfredEnv('theme_background'),
    themeSelectionBackground: _getAlfredEnv('theme_selection_background'),
    themeSubtext: Number(_getAlfredEnv('theme_subtext')),
    data: _getAlfredEnv('workflow_data'),
    cache: _getAlfredEnv('workflow_cache'),
    preferences: _getAlfredEnv('preferences'),
    preferencesLocalHash: _getAlfredEnv('preferences_localhash'),
  },
  log: (text: string) => {
    console.error(text);
  },
  error: (err: Error) => {
    const msg = err.stack || err.toString();
    const copy = `
  \`\`\`
  ${msg}
  \`\`\`
  
-
${aw.meta.name} ${aw.meta.version}
Alfred ${aw.alfred.version}
${tjs.platform} ${tjs.networkInterfaces().toString()}
	`.trim();
    aw.output([
      {
        title: err.stack ? `${err.name}: ${err.message}` : err.toString(),
        subtitle: 'Press ⌘L to see the full error and ⌘C to copy it.',
        valid: false,
        text: {
          copy,
          largetype: msg,
        },
        icon: {
          path: aw.icon.error,
        },
      },
    ]);
  },
};
export default aw;

function _getIcon(name: string): string {
  return `/System/Library/CoreServices/CoreTypes.bundle/Contents/Resources/${name}.icns`;
}
function _getEnv(key: string): string {
  const value = tjs.getenv[key];
  if (value === undefined) {
    throw new Error(`Environment variable ${key} is not defined.`);
  }
  return value;
}
function _getAlfredEnv(key: string): string {
  return _getEnv(`alfred_${key}`);
}
