const chalk = require('chalk')

const getColors = n => {
  const colors = []
  for (let hue = 0; hue < 360; hue += 360 / n) {
    const saturation = Math.floor(90 + Math.random() * 10)
    const lightness = Math.floor(50 + Math.random() * 10)
    const color = chalk.hsl(hue, saturation, lightness)
    colors.push(color)
  }
  return colors
}

const colors = getColors(20)

const highlight = line => {
  let leftCount = 0
  const stack = []
  const highlighted = line.split('').map(char => {
    if (char == '(') {
      const color = colors[leftCount++ % colors.length]
      stack.push(color)
      return color('(')
    }
    if (char == ')') {
      const color = stack.pop()
      return color ? color(')') : chalk.bgRed(')')
    }
    return char
  }).join('')
  return highlighted
}

module.exports = core => {
  core.onBeforePrint.push(function () {
    const src = this.currentOutput
    if (src) this.currentOutput = highlight(src)
  })
}