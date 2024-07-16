export const nameToDotNotation = {
  name: 'name/dotNotation',
  type: "name",
  transform: async (token) => {
    return token.path.map(item => item.replace(/ /g, '-')).join(".");
  }
}
