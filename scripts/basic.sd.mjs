// init StyleDictionary
import StyleDictionary from 'style-dictionary';

// create a new instance of StyleDictionary
const sd = new StyleDictionary()
// add our configuration
// NOTE: you must await this
const configuredSd = await sd.extend({
  "source": ["src/tokens/functional/**/*.json"],
  "include": ["src/tokens/base/**/*.json5"],
  "platforms": {
    "css": {
      "transformGroup": "css",
      "buildPath": "dist/css/",
      "files": [
        {
          "destination": "design-tokens.css",
          "format": "css/variables"
        }
      ]
    }
  }  
})

// clean our dist repo
await configuredSd.cleanAllPlatforms()
// build our design tokens
configuredSd.buildAllPlatforms()