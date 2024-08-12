import typography from "../../../dist/docs/typography.json"

export const fontSizesArray = Object.values(typography).filter(item => item.name.startsWith('typography.size')).map(item => item.$value);
