# aw

> a tiny tool for Create Alfred workflows.

## Highlights

- Easy input↔output.
- Not require node,buildIn a tiny js runtime: [txiki.js](https://github.com/saghul/txiki.js).
- BuildIn fetch.
- Support for `async await`(ESM).

## Prerequisites

You need [Alfred 4](https://www.alfredapp.com/) with the paid [Powerpack](https://www.alfredapp.com/powerpack/) upgrade.

## Install

```sh
$ npm install @jsany/aw
```

## Usage

**IMPORTANT**: Your script will be run as [ESM](https://nodejs.org/api/esm.html).

1. Create a new blank Alfred workflow.
2. Add a `Script Filter` (right-click the canvas → `Inputs` → `Script Filter`), set `Language` to /`bin/bash`, and add the following script: `.node_modules/@jsany/aw/runtime/tjs ./index.js "$1"`
3. Set the `Keyword` by which you want to invoke your workflow.
4. Go to your new workflow directory (right-click on the workflow in the sidebar → `Open in Finder`).
5. Initialize a repo with `npm init`.
6. Add `"type": "module"` to package.json.
7. Install `aw` with `npm install @jsany/aw`.
8. In the workflow directory, create a `index.js` file, import `./node_modules/@jsany/aw/lib/index.js`(**it necessary because [txiki not support](https://github.com/saghul/txiki.js/issues/295#issuecomment-1128659327)**), and do your thing.

## Example

Here we fetch some JSON from a placeholder API and present matching items to the user:

```js
import aw from "./node_modules/@jsany/aw/lib/index.js";

const res = await aw.fetch.get("https://jsonplaceholder.typicode.com/posts");

const items = aw.inputMatches(res.data, "title").map((element) => ({
  title: element.title,
  subtitle: element.body,
  arg: element.id,
}));

aw.output(items);
```

## API

### input

Type: `string`

Input from Alfred. What the user wrote in the input box.

### output(list, options?)

Return output to Alfred.

#### list

Type: `object[]`

List of `object` with any of the [supported properties](https://www.alfredapp.com/help/workflows/inputs/script-filter/json/).

Example:

```js
import aw from "./node_modules/@jsany/aw/lib/index.js";

aw.output([
  {
    title: "Unicorn",
  },
  {
    title: "Rainbow",
  },
]);
```

#### options

Type: `object`

##### rerunInterval

Type: `number` _(seconds)_\
Values: `0.1...5.0`

A script can be set to re-run automatically after some interval. The script will only be re-run if the script filter is still active and the user hasn't changed the state of the filter by typing and triggering a re-run. [More info.](https://www.alfredapp.com/help/workflows/inputs/script-filter/json/)

For example, it could be used to update the progress of a particular task:

```js
import aw from "./node_modules/@jsany/aw/lib/index.js";

aw.output(
  [
    {
      title: "Downloading Unicorns…",
      subtitle: `${progress}%`,
    },
  ],
  {
    // Re-run and update progress every 3 seconds.
    rerunInterval: 3,
  }
);
```

### log(value)

Log value to the [Alfred workflow debugger](https://www.alfredapp.com/help/workflows/advanced/debugger/).

### matches(input, list, target?)

Returns an `string[]` of items in `list` that case-insensitively contains `input`.

```js
import aw from "./node_modules/@jsany/aw/lib/index.js";

aw.matches("Corn", ["foo", "unicorn"]);
//=> ['unicorn']
```

#### input

Type: `string`

Text to match against the `list` items.

#### list

Type: `string[]`

List to be matched against.

#### target

Type: `string | Function`

By default, it will match against the `list` items.

Specify a string to match against an object property:

```js
import aw from "./node_modules/@jsany/aw/lib/index.js";

const list = [
  {
    title: "foo",
  },
  {
    title: "unicorn",
  },
];

aw.matches("Unicorn", list, "title");
//=> [{title: 'unicorn'}]
```

Or nested property:

```js
import aw from "./node_modules/@jsany/aw/lib/index.js";

const list = [
  {
    name: {
      first: "John",
      last: "Doe",
    },
  },
  {
    name: {
      first: "Sindre",
      last: "Sorhus",
    },
  },
];

aw.matches("sindre", list, "name.first");
//=> [{name: {first: 'Sindre', last: 'Sorhus'}}]
```

Specify a function to handle the matching yourself. The function receives the list item and input, both lowercased, as arguments, and is expected to return a boolean of whether it matches:

```js
import aw from "./node_modules/@jsany/aw/lib/index.js";

const list = ["foo", "unicorn"];

// Here we do an exact match.
// `Foo` matches the item since it's lowercased for you.
aw.matches("Foo", list, (item, input) => item === input);
//=> ['foo']
```

### inputMatches(list, item?)

Same as `matches()`, but with `aw.input` as `input`.

### error(error)

Display an error or error message in Alfred.

#### error

Type: `Error | string`

Error or error message to be displayed.

### fetch

Returns a Promise that returns the body of the response.

Refer to the [redaxios](https://github.com/developit/redaxios)

### icon

Type: `object`
Keys: `'info' | 'warning' | 'error' | 'alert' | 'like' | 'delete'`

Get various default system icons.

The most useful ones are included as keys. The rest you can get with `icon.get()`. Go to `/System/Library/CoreServices/CoreTypes.bundle/Contents/Resources` in Finder to see them all.

Example:

```js
import aw from "./node_modules/@jsany/aw/lib/index.js";

console.log(aw.icon.error);
//=> '/System/Library/CoreServices/CoreTypes.bundle/Contents/Resources/AlertStopIcon.icns'

console.log(aw.icon.get("Clock"));
//=> '/System/Library/CoreServices/CoreTypes.bundle/Contents/Resources/Clock.icns'
```

### meta

Type: `object`

Example:

```js
{
	name: 'Emoj',
	version: '0.2.5',
	uid: 'user.workflow.B0AC54EC-601C-479A-9428-01F9FD732959',
	bundleId: 'com.sindresorhus.emoj'
}
```

### alfred

Type: `object`

Alfred metadata.

#### version

Example: `'4.6.1'`

Find out which version the user is currently running. This may be useful if your workflow depends on a particular Alfred version's features.

#### theme

Example: `'alfred.theme.yosemite'`

Current theme used.

#### themeBackground

Example: `'rgba(255,255,255,0.98)'`

If you're creating icons on the fly, this allows you to find out the color of the theme background.

#### themeSelectionBackground

Example: `'rgba(255,255,255,0.98)'`

The color of the selected result.

#### themeSubtext

Example: `3`

Find out what subtext mode the user has selected in the Appearance preferences.

> Usability note: This is available so developers can tweak the result text based on the user's selected mode, but a workflow's result text should not be bloated unnecessarily based on this, as the main reason users generally hide the subtext is to make Alfred look cleaner.

#### data

Example: `'~/Library/Application Support/Alfred/Workflow Data/com.daolou.npms'`

Recommended location for non-volatile data. Just use `aw.data` which uses this path.

#### cache

Example: `'~/Library/Caches/com.runningwithcrayons.Alfred/Workflow Data/com.daolou.npms'`

Recommended location for volatile data. Just use `aw.cache` which uses this path.

#### preferences

Example: `'~/Dropbox/Alfred/Alfred.alfredpreferences'`

This is the location of the `Alfred.alfredpreferences`. If a user has synced their settings, this will allow you to find out where their settings are regardless of sync state.

#### preferencesLocalHash

Example: `'4c19030476c54fcbb55a7051e04e26fc1c52f909'`

Non-synced local preferences are stored within `Alfred.alfredpreferences` under `…/preferences/local/${preferencesLocalHash}/`.

## Users

_Alfred workflows using aw_

- [alfred-adcode](https://github.com/daolou/alfred-adcode) - 根据区域码或中文名获取行政信息

## Related

- https://www.alfredapp.com/help/workflows/inputs/script-filter/json/
- https://www.alfredapp.com/help/workflows/

## Maintainers

- [[KhaZix]daolou](https://github.com/daolou)
