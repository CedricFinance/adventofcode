function computeDistance(timePushed, totalTime) {
  const speed = timePushed
  return speed * (totalTime - timePushed)
}

export function countWaysToBeatRecord(time, record) {
  var result = 0
  for (let i = 1; i < time; i++) {
    const d = computeDistance(i, time)
    if (d>record) { result++ }
  }
  return result
}
