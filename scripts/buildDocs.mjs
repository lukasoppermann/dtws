import StyleDictionary from 'style-dictionary';

const sd = new StyleDictionary({
  source: ["src/tokens/functional/**/*.json5"],
  platforms: {
    json: {
      buildPath: "dist/docs/",
      files: [
        {
          destination: "docs.json",
          format: "json",
        },
      ],
    },
  },
});

await sd.buildAllPlatforms();