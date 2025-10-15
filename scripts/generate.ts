import dataSource from "emoji-datasource/emoji.json";
import data from "emojibase-data/en/data.json";
import messages from "emojibase-data/en/messages.json";
import emojibaseShortcodes from "emojibase-data/en/shortcodes/emojibase.json";
import gitHubShortcodes from "emojibase-data/en/shortcodes/github.json";
import fs from "fs";
import json5 from "json5";
// Local
import type { EmojiItem } from "../src/types/emoji";
import { removeVariationSelector } from "./helpers/removeVariationSelector";

type OutFile = "data" | "data_tags" | "data_all";

/**
 * Filters tags to reduce file size while maintaining search utility.
 *
 * Removes tags when:
 * 1. The first 3 letters prefix the emoji name
 * 2. The first 3 letters prefix any shortcode segment
 * 3. It contains spaces or hyphens (e.g., "in love", "blond-haired")
 */
function filterTags(
  tags: string[],
  shortcodes: string[],
  name: string,
): string[] {
  // Extract all segments from all shortcodes (split by underscore)
  const shortcodeSegments: string[] = [];
  shortcodes.forEach((shortcode) => {
    shortcode.split("_").forEach((segment) => {
      shortcodeSegments.push(segment);
    });
  });

  return tags.filter((tag) => {
    // Get first 3 letters of the tag
    const tagPrefix = tag.slice(0, 3);

    // Filter out if first 3 letters match the beginning of the name
    if (name.startsWith(tagPrefix)) {
      return false;
    }

    // Filter out if first 3 letters match the beginning of any shortcode segment
    if (shortcodeSegments.some((segment) => segment.startsWith(tagPrefix))) {
      return false;
    }

    // Filter out if tag contains spaces or hyphens (multi-word tags)
    if (tag.includes(" ") || tag.includes("-")) {
      return false;
    }

    return true;
  });
}

function writeFile(out_file: OutFile = "data") {
  const EMOTICONS_DISABLED = out_file !== "data_all";
  const FALLBACKS_DISABLED = true;
  const GITHUB_DISABLED = true;
  const TAGS_DISABLED = out_file === "data";
  const VERSIONS_DISABLED = out_file !== "data_all";

  const emojis: EmojiItem[] = data
    .filter((emoji) => emoji.version > 0 && emoji.version < 14)
    .map((emoji) => {
      const dataSourceEmoji = dataSource.find((item) => {
        return (
          item.unified === emoji.hexcode || item.non_qualified === emoji.hexcode
        );
      });
      const hasFallbackImage = dataSourceEmoji?.has_img_apple;

      const name =
        [gitHubShortcodes[emoji.hexcode]].flat()[0] ||
        [emojibaseShortcodes[emoji.hexcode]].flat()[0]!;
      const shortcodes = emojibaseShortcodes[emoji.hexcode]
        ? [emojibaseShortcodes[emoji.hexcode]!].flat()
        : [];
      const emoticons = emoji.emoticon ? [emoji.emoticon].flat() : [];

      let tags = emoji.tags
        ? filterTags(emoji.tags, shortcodes, name)
        : undefined;
      if (!tags?.length) {
        tags = undefined;
      }

      return {
        emoji: removeVariationSelector(emoji.emoji),
        name,
        shortcodes,

        tags: TAGS_DISABLED ? undefined : tags,

        group: emoji.group
          ? (messages.groups[emoji.group]?.message ?? "")
          : undefined,

        emoticons: EMOTICONS_DISABLED
          ? undefined
          : emoticons.length > 0
            ? emoticons
            : undefined,

        version: VERSIONS_DISABLED ? undefined : emoji.version,

        fallbackImage: FALLBACKS_DISABLED
          ? undefined
          : hasFallbackImage
            ? `https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/${dataSourceEmoji.image}`
            : undefined,
      };
    });

  // #region - GitHub

  const gitHubCustomEmojiNames = [
    // "atom",
    // "basecamp",
    // "basecampy",
    "bowtie",
    // "electron",
    "feelsgood",
    // "finnadie",
    // "goberserk",
    // "godmode",
    // "hurtrealbad",
    // "neckbeard",
    // "octocat",
    "rage1",
    "rage2",
    "rage3",
    "rage4",
    "shipit",
    "suspect",
    "trollface",
  ];

  const gitHubCustomEmojis: EmojiItem[] = gitHubCustomEmojiNames.map((name) => {
    return {
      name,
      shortcodes: [name],
      tags: [],
      group: "GitHub",
      fallbackImage: `https://github.githubassets.com/images/icons/emoji/${name}.png`,
    };
  });

  const content_github = `// This is a generated file

import type { EmojiItem } from "./types/emoji";

export const emojis: EmojiItem[] = ${json5.stringify(emojis, { space: 2, quote: '"' })};

export const gitHubCustomEmojis: EmojiItem[] = ${json5.stringify(gitHubCustomEmojis, { space: 2, quote: '"' })};

export const gitHubEmojis: EmojiItem[] = [...emojis, ...gitHubCustomEmojis];
`;
  // #endregion

  const content = `// This is a generated file

import type { EmojiItem } from "./types/emoji";

export const emojis: EmojiItem[] = ${json5.stringify(emojis, { space: 2, quote: '"' })};
`;

  if (GITHUB_DISABLED) {
    fs.writeFileSync(`./src/${out_file}.ts`, content);
  } else {
    fs.writeFileSync(`./src/${out_file}.ts`, content_github);
  }
}

writeFile("data");
writeFile("data_all");
writeFile("data_tags");
