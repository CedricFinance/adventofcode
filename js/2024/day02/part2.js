import * as aoc from '../../2020/aoc.js'

function isSafe(report) {
  const diffs = []
  for (let i = 0; i < report.length - 1; i++) {
    diffs.push(report[i+1] - report[i])
  }

  if (diffs.some(diff => diff == 0 || diff > 3 || diff < -3)) {
    return false
  }

  const isIncreasing = diffs[0] > 0
  if (isIncreasing) {
    return diffs.every(diff => diff > 0)
  }
  return diffs.every(diff => diff < 0)
}

function isSafe2(report) {
  if (isSafe(report)) {
    return true
  }

  for (let i = 0; i < report.length; i++) {
    const newReport = [...report.slice(0, i), ...report.slice(i+1)]

    if (isSafe(newReport)) {
      return true
    }
  }

  return false
}
// 685 no


aoc.run(async function(input) {
  const reports = input.lines().map(line => line.split(" ").map(part => parseInt(part, 10)))
  var result = 0

  for (const report of reports) {
    //console.log(report);

    if (isSafe2(report)) {
      result++
    }
  }

  return result
})
