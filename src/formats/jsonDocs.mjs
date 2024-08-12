const jsonFlatten = (tokens) => {
  const flattenedArray = tokens.map(token => [token.name, token])
  // return as object
  return Object.fromEntries(flattenedArray)
}
/**
 */
const jsonDocsFormatter = ({dictionary, file: _file, options}) => {
  //
  const tokens = jsonFlatten(dictionary.allTokens)
  // add file header and convert output
  const output = JSON.stringify(tokens, null, 2)
  // return prettified
  return output
}

export const jsonDocs = {
  name: 'json/docs',
  format: jsonDocsFormatter,
}