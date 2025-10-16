# webmoji

A small set of emoji data for the web.

Maintained to be compatible with a custom, forked version of
`@tiptap/extension-emoji` (namely:
[tiptap-webmoji](https://npmjs.com/package/tiptap-webmoji)) or any other
implementation which can use:

- an optional `tags` property on the exported `EmojiItem` type e.g.
  `tags?: string[]` instead of the original `tags: string[]`
- _PLANNED:_ a more compact fallback image strategy. See `EmojiItem` comments.

## Bundle size

| Export        | size      | gzip     | Description                         |
| ------------- | --------- | -------- | ----------------------------------- |
| `.`           | 162.43 kB | 25.37 kB | `default` export, minimal data.     |
| `./data_tags` | 195.80 kB | 34.21 kB | With searchable `tags`.             |
| `./data_all`  | 216.11 kB | 35.99 kB | With `emoticons`, `tags`, `version` |
| `./types`     | 0 kB      | 0 kB     | Just types.                         |

## Types

### EmojiItem

The default module and other data modules each export a single `EmojiItem[]`.

```ts
type EmojiItem = {
  /** Unique name of the emoji. */
  name: string;
  /** The emoji unicode character. */
  emoji?: string;
  /** Array of unique strings to find the emoji. */
  shortcodes: string[];
  /** A list of tags that can help for searching emojis. */
  tags?: string[];
  /** A name that can help to group emojis. */
  group?: string;
  /** A list of unique ASCII style emoticons. */
  emoticons?: string[];
  /** The unicode version the emoji was introduced. */
  version?: number;
  /** Store some custom data. */
  [key: string]: any;
};
```

## History

### v1.0.0

- Forked from
  [@tiptap/extension-emoji v3.7.0](https://github.com/ueberdosis/tiptap/tree/v3.7.0/packages/extension-emoji)
- Removed tiptap related code.
- Setup vite library build.
- Reorganized code to separate `scripts` from `src`.
- Modify `scripts/generate.ts` and `EmojiItem` type to produce smaller data.
- Added options to `scripts/generate.ts` to generate multiple files.

### v2.0.0

- Changed package exports to expose `./types`, removing duplicate type exports.
  - Actually export `EmojiItem` type instead of just using it.

### v3.0.0

- Fixed package exports to expose types where necessary.
