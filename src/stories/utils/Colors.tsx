import light from "../../../dist/docs/base/light.json"
import dark from "../../../dist/docs/base/dark.json"


const groupColors = (colors) => {
  return Object.values(colors).reduce((acc, current) => {
    const name = current.name.replace('base.color.','')
    if(name.includes('.')) {
      const [group, ] = name.split('.')
      if(!acc[group]) {
        acc[group] = []
      }
      acc[group].push(current)
    } else {
      acc[name] = current
    }
    return acc
  }, {})
}

export const colors = {
  light: groupColors(light),
  dark: groupColors(dark),
}