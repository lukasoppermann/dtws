import {readFile} from 'fs/promises'
import {getContrast} from 'color2k'

const contrastRatios = {
  text : 4.5,
  border: 3
}
const colorPairs = [
  // test text color vs. background color
  ['text', 'fgColor.default', 'bgColor.default'],
  ['text', 'fgColor.default', 'bgColor.muted'],
  ['text', 'fgColor.link', 'bgColor.default'],
  ['text', 'fgColor.link', 'bgColor.muted'],
  // test border color vs. background color
  ['border', 'borderColor.contrast', 'bgColor.default'],
  ['border', 'borderColor.contrast', 'bgColor.muted'],
]

/**
 * runContrastTest
 * @description runs through all color pairs and checks the contrasts
 */
const runContrastTest = (colorPairs, tokens, contrastRatio) => {
  return colorPairs.flatMap(([contrastType, colorA, colorB]) => {
    // concat name
    const contrastPair = `${colorA} vs. ${colorB}`
    // build required string
    const contrastNumber = contrastRatios[contrastType]
    const minimumContrastRatio = `${contrastNumber}:1`
    // find color in json
    if (!tokens.hasOwnProperty(colorA)) throw new Error(`Color token not found ${colorA}`)
    if (!tokens.hasOwnProperty(colorB)) throw new Error(`Color token not found ${colorB}`)

    return {
      contrastPair,
      ...testContrast(contrastNumber, tokens[colorA].$value, tokens[colorB].$value),
      minimumContrastRatio,
    }
  })
}
/**
 * testContrast
 * @description test the contrast of two colors against each other
 */
const testContrast = (
  minimumContrast,
  colorA,
  colorB,
) => {
  // get contrast
  let contrast = 0
  try {
    // get contrast rounded down with 2 decimals
    contrast = Math.floor(getContrast(colorA, colorB) * 100) / 100
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(`${colorA} vs.${colorB}: ${err}`)
  }
  return {
    pass: contrast >= minimumContrast ? '✅' : '❌',
    contrastRatio: `${contrast}:1`,
  }
}

// ----------------------------------------------
//
// token files to test
const filePath = './dist/docs/themes/'
const themes = ['light', 'dark']
//
// Load the tokens from json
for (const themeName of themes) {
  const tokens = await JSON.parse(
    await readFile(`${filePath}${themeName}.json`, 'utf8'),
  )
  // Run the test
  //
  const results = runContrastTest(colorPairs, tokens, contrastRatios)
  // Output the results
  console.log(`\n#### Theme: ${themeName}\n`)
  console.log('| Contrast pair | Pass or fail | Actual contrast ratio  | Required contrast ratio |')
  results.map(item => console.log(`| ${Object.values(item).join(" | ")} |`) )
}