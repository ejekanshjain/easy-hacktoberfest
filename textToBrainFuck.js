function textToBrainFuck(str = '') {
  let finalCode = ''
  for (let i = 0; i < str.length; i++) {
    let current = i === 0 ? '' : '\n>'
    const ascii = str.charCodeAt(i)
    const sqrt = Math.floor(Math.sqrt(ascii))
    const multi = sqrt * sqrt
    const remaining = ascii - multi
    for (let j = 0; j < sqrt; j++) current += '+'
    current += '[>'
    for (let j = 0; j < sqrt; j++) current += '+'
    current += '<-]>'
    for (let k = 0; k < remaining; k++) current += '+'
    finalCode += current + '.'
  }

  return finalCode
}

console.log(textToBrainFuck(`LOL`))
