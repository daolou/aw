export interface OutputOptions {
  /**
	A script can be set to re-run automatically after some interval.

	The script will only be re-run if the script filter is still active and the user hasn't changed the state of the filter by typing and triggering a re-run. For example, it could be used to update the progress of a particular task:
	*/
  readonly rerunInterval?: number;
}

/**
The icon displayed in the result row. Workflows are run from their workflow folder, so you can reference icons stored in your workflow relatively.

By omitting the `.type`, Alfred will load the file path itself, for example a PNG.

By using `{type: 'fileicon}`, Alfred will get the icon for the specified path.

Finally, by using `{type: 'filetype'}`, you can get the icon of a specific file. For example, `{path: 'public.png'}`.
*/
export interface IconElement {
  readonly path?: string;
  readonly type?: 'fileicon' | 'filetype';
}

/**
The text element defines the text the user will get when copying the selected result row with `⌘C` or displaying large type with `⌘L`.

If these are not defined, you will inherit Alfred's standard behaviour where the argument is copied to the Clipboard or used for Large Type.
*/
export interface TextElement {
  /**
	User will get when copying the selected result row with `⌘C`.
	*/
  readonly copy?: string;

  /**
	User will get displaying large type with `⌘L`.
	*/
  readonly largetype?: string;
}

/**
Defines what to change when the modifier key is pressed.

When you release the modifier key, it returns to the original item.
*/
export interface ModifierKeyItem {
  readonly valid?: boolean;
  readonly title?: string;
  readonly subtitle?: string;
  readonly arg?: string;
  readonly icon?: string;
  readonly variables?: Record<string, string>;
}

/**
This element defines the Universal Action items used when actioning the result, and overrides arg being used for actioning.

The action key can take a string or array for simple types, and the content type will automatically be derived by Alfred to file, URL or text.
*/
export interface ActionElement {
  /**
	Forward text to Alfred.
	*/
  readonly text?: string | string[];

  /**
	Forward URL to Alfred.
	*/
  readonly url?: string | string[];

  /**
	Forward file path to Alfred.
	*/
  readonly file?: string | string[];

  /**
	Forward some value and let the value type be infered from Alfred.
	*/
  readonly auto?: string | string[];
}

type PossibleModifiers = 'fn' | 'ctrl' | 'opt' | 'cmd' | 'shift';

/**
Each item describes a result row displayed in Alfred.
*/
export interface ScriptFilterItem {
  /**
	This is a unique identifier for the item which allows help Alfred to learn about this item for subsequent sorting and ordering of the user's actioned results.

	It is important that you use the same UID throughout subsequent executions of your script to take advantage of Alfred's knowledge and sorting.

	If you would like Alfred to always show the results in the order you return them from your script, exclude the UID field.
	*/
  readonly uid?: string;

  /**
	The title displayed in the result row. There are no options for this element and it is essential that this element is populated.

	@example
	```
	{title: 'Desktop'}
	```
	*/
  readonly title: string;

  /**
	The subtitle displayed in the result row. This element is optional.

	@example
	```
	{subtitle: '~/Desktop'}
	```
	*/
  readonly subtitle?: string;

  /**
	The argument which is passed through the workflow to the connected output action.

	While the `arg` attribute is optional, it's highly recommended that you populate this as it's the string which is passed to your connected output actions.

	If excluded, you won't know which result item the user has selected.

	@example
	```
	{arg: '~/Desktop'}
	```
	*/
  readonly arg?: string;

  /**
	The icon displayed in the result row. Workflows are run from their workflow folder, so you can reference icons stored in your workflow relatively.

	By omitting the `.type`, Alfred will load the file path itself, for example a png.

	By using `{type: 'fileicon'}`, Alfred will get the icon for the specified path. Finally, by using `{type: 'filetype'}`, you can get the icon of a specific file. For example, `{path: 'public.png'}`.

	@example
	```
	{
		icon: {
			type: 'fileicon',
			path: '~/Desktop'
		}
	}
	```
	*/
  readonly icon?: IconElement | string;

  /**
	If this item is valid or not. If an item is valid then Alfred will action this item when the user presses return.

	@default true
	*/
  readonly valid?: boolean;

  /**
	From Alfred 3.5, the match field enables you to define what Alfred matches against when the workflow is set to 'Alfred Filters Results'.

	If match is present, it fully replaces matching on the title property.
	*/
  readonly match?: string;

  /**
	An optional but recommended string you can provide which is populated into Alfred's search field if the user auto-complete's the selected result (`⇥` by default).
	*/
  readonly autocomplete?: string;

  /**
	By specifying `{type: 'file'}`, it makes Alfred treat your result as a file on your system. This allows the user to perform actions on the file like they can with Alfred's standard file filters.

	When returning files, Alfred will check if the file exists before presenting that result to the user.

	This has a very small performance implication but makes the results as predictable as possible.

	If you would like Alfred to skip this check as you are certain that the files you are returning exist, you can use `{type: 'file:skipcheck'}`.

	@default 'default'
	*/
  readonly type?: 'default' | 'file' | 'file:skipcheck';

  /**
	Gives you control over how the modifier keys react.

	You can now define the valid attribute to mark if the result is valid based on the modifier selection and set a different arg to be passed out if actioned with the modifier.
	*/
  readonly mods?: Partial<Record<PossibleModifiers, ModifierKeyItem>>;

  /**
	This element defines the Universal Action items used when actioning the result, and overrides arg being used for actioning.

	The action key can take a string or array for simple types, and the content type will automatically be derived by Alfred to file, url or text.

	@example
	```
	{
		// For Single Item,
		action: 'Alfred is Great'

		// For Multiple Items,
		action: ['Alfred is Great', 'I use him all day long']

		// For control over the content type of the action, you can use an object with typed keys as follows:
		action: {
			text: ['one', 'two', 'three'],
			url: 'https://alfredapp.com',
			file: '~/Desktop',
			auto: '~/Pictures'
		}
	}
	```
	*/
  // TODO (jopemachine): Activate attribute below after 'action' is implemented in Alfred.
  // readonly action?: string | string[] | ActionElement;

  /**
	The text element defines the text the user will get when copying the selected result row with `⌘C` or displaying large type with `⌘L`.

	@example
	```
	{
		text: {
			copy: 'https://alfredapp.com (text here to copy)',
			largetype: 'https://alfredapp.com (text here for large type)'
		}
	}
	```
	*/
  readonly text?: TextElement;

  /**
	A Quick Look URL which will be visible if the user uses the Quick Look feature within Alfred (tapping shift, or `⌘Y`).

	Note that it can also accept a file path, both absolute and relative to home using `~/`.

	@example
	```
	{
		quicklookurl: 'https://alfredapp.com'
	}
	```
	*/
  readonly quicklookurl?: string;

  /**
	Variables can be passed out of the script filter within a variables object.
	*/
  readonly variables?: Record<string, string>;
}
