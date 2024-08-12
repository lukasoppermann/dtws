import StyleDictionary from 'style-dictionary';
import { nameToDotNotation } from '../src/transformers/nameToDotNotation.mjs';
import { jsonDocs } from '../src/formats/jsonDocs.mjs';

// initialize StyleDictionary
const sd = new StyleDictionary()
sd.registerTransform(nameToDotNotation)
sd.registerFormat(jsonDocs)

// --------
// Build colors
// list of themes
const themes = ['light', 'dark']

for (const theme of themes) {
  // extend StyleDictionary with the theme
  const themeSd = await sd.extend({
    source: [`src/tokens/functional/themes/${theme}.json5`],
    include: [`src/tokens/base/color/${theme}.json5`],
    platforms: {
      json: {
        buildPath: `dist/docs/themes/`,
        transforms: ["name/dotNotation"],
        files: [
          {
            filter: (token) => token.isSource,
            destination: `${theme}.json`,
            format: "json/docs",
          },
        ],
      },
    },
  });

  await themeSd.buildAllPlatforms();
}

// --------
// Build colors
// list of themes
const baseThemes = ['light', 'dark']

for (const theme of baseThemes) {
  // extend StyleDictionary with the theme
  const themeSd = await sd.extend({
    source: [`src/tokens/base/color/${theme}.json5`],
    platforms: {
      json: {
        buildPath: `dist/docs/base/`,
        transforms: ["name/dotNotation"],
        files: [
          {
            destination: `${theme}.json`,
            format: "json/docs",
          },
        ],
      },
    },
  });
  await themeSd.buildAllPlatforms();
}

// --------
// Build other tokens
const extendedSd = await sd.extend({
  "log": {
    "warnings": "warn", // "error", "warn", "disabled" -> "warn" is default
    "verbosity": "verbose" // "silent", "default", "verbose" -> "default" is default
  },
  source: [`src/tokens/functional/size/*.json5`, `src/tokens/base/typography.json5`],
  include: ['src/tokens/base/*.json5'],
  platforms: {
    json: {
      buildPath: `dist/docs/`,
      transforms: ["name/dotNotation"],
      files: [
        {
          filter: (token) => token.filePath.startsWith('src/tokens/functional/size/'),
          destination: `size.json`,
          format: "json/docs",
        },
        {
          filter: (token) => token.filePath.startsWith('src/tokens/base/typography.json5'),
          destination: `typography.json`,
          format: "json/docs",
        },
        {
          filter: (token) => token.filePath.startsWith('src/tokens/base/color/dark.json5'),
          destination: `base/dark.json`,
          format: "json/docs",
        },
        {
          filter: (token) => token.filePath.startsWith('src/tokens/base/color/light.json5'),
          destination: `base/light.json`,
          format: "json/docs",
        },
      ],
    },
  },
});

await extendedSd.buildAllPlatforms();