import StyleDictionary from 'style-dictionary';
import { nameToDotNotation } from '../src/transformer/nameToDotNotation.mjs';

// initialize StyleDictionary
const sd = new StyleDictionary()
sd.registerTransform(nameToDotNotation)
// list of themes
const themes = ['light', 'dark']

for (const theme of themes) {
  // extend StyleDictionary with the theme
  const themeSd = await sd.extend({
    source: [`src/tokens/functional/themes/${theme}.json5`],
    platforms: {
      json: {
        buildPath: `dist/docs/themes/`,
        transforms: ["name/dotNotation"],
        files: [
          {
            destination: `${theme}.json`,
            format: "json/flat",
          },
        ],
      },
    },
  });

  await themeSd.buildAllPlatforms();
}
