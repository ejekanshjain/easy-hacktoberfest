function brainFuckToText(str = '') {
  let output = ''
  const arr = []
  for (let i = 0; i < 32768; i++) arr.push(0)
  let pointer = 0
  const splitted = str.split('')
  const loopStack = []

  for (let i = 0; i < splitted.length; i++) {
    const s = splitted[i]
    switch (s) {
      case '.': {
        output += String.fromCharCode(arr[pointer])
        break
      }
      case '>': {
        pointer++
        break
      }
      case '<': {
        pointer--
        break
      }
      case '+': {
        arr[pointer]++
        break
      }
      case '-': {
        arr[pointer]--
        break
      }
      case '[': {
        if (arr[pointer] === 0) {
          let openBrackets = 1
          while (openBrackets > 0) {
            i++
            if (splitted[i] === '[') {
              openBrackets++
            } else if (splitted[i] === ']') {
              openBrackets--
            }
          }
        } else {
          loopStack.push(i)
        }
        break
      }
      case ']': {
        if (arr[pointer] !== 0) {
          const openBracketPos = loopStack.pop()
          if (openBracketPos !== undefined) {
            i = openBracketPos - 1
          }
        }
        break
      }
      default: {
        break
      }
    }
  }

  return output
}

console.log(
  brainFuckToText(`++++++++[>++++++++<-]>++++++++++++.
>++++++++[>++++++++<-]>+++++++++++++++.
>++++++++[>++++++++<-]>++++++++++++.`)
)
