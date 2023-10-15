function generatePermutations(arr) {
  const result = []

  function permute(arr, current = []) {
    if (arr.length === 0) {
      result.push(current)
      return
    }

    for (let i = 0; i < arr.length; i++) {
      const newArr = [...arr]
      const item = newArr.splice(i, 1)
      permute(newArr, current.concat(item))
    }
  }

  permute(arr)

  return result
}

function roundOff(num) {
  return parseFloat(num.toFixed(2))
}

function computeTime(sequence, items) {
  const nJobs = items[0].length
  const start = new Array(nJobs).fill(0)
  const end = new Array(nJobs).fill(0)

  for (const itemIndex of sequence) {
    const item = items[itemIndex]

    for (let i = 0; i < nJobs; i++) {
      const prevJobsTotalTime = i === 0 ? 0 : end[i - 1]

      const currentJobTime = item[i]

      start[i] = Math.max(prevJobsTotalTime, end[i])
      end[i] = roundOff(start[i] + currentJobTime)
    }
  }

  return end[nJobs - 1]
}

function main() {
  console.time('main')
  const items = [
    [0.23, 0.19, 0.19, 0.19, 1, 0.35],
    [0.35, 0.29, 0.29, 0.1, 1, 0.53]
  ]

  const deadline = 7
  const assembly = 1
  const deadlineBeforeAssembly = deadline - assembly

  let min = Infinity
  let bestSequence

  const sequence = items.map((_, i) => i)
  const allPermutations = generatePermutations(sequence)

  console.log('Total permutations =>', allPermutations.length)

  for (const permutation of allPermutations) {
    const time = computeTime(permutation, items)
    console.log('Time for sequence', permutation, '=>', time)
    if (time < min) {
      min = time
      bestSequence = permutation
    }
  }

  console.log('Best sequence:', bestSequence, 'Time:', min)
  console.log('Start Date:', Math.floor(deadlineBeforeAssembly - min))
  console.timeEnd('main')
}

main()
