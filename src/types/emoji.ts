export type EmojiItem = {
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
  // TODO: Don't store full URLs, store identifiers...
  // /**
  //  * A fallback image if the current system doesn't support the emoji or for custom emojis
  //  */
  // fallbackImage?: string;
  /** Store some custom data. */
  [key: string]: any;
};
