import * as aoc from '../../2020/aoc.js'

const mapping = new Map()
mapping.set("A", "rock")
mapping.set("B", "paper")
mapping.set("C", "scissor")

const resultMapping = new Map()
resultMapping.set("X", "LOSE")
resultMapping.set("Y", "DRAW")
resultMapping.set("Z", "WIN")

const choiceScore = new Map()
choiceScore.set("rock", 1)
choiceScore.set("paper", 2)
choiceScore.set("scissor", 3)

const choiceToWin = new Map()
choiceToWin.set("rock", "paper")
choiceToWin.set("paper", "scissor")
choiceToWin.set("scissor", "rock")

const choiceToLose = new Map()
choiceToLose.set("rock", "scissor")
choiceToLose.set("paper", "rock")
choiceToLose.set("scissor", "paper")

const resultScore = new Map()
resultScore.set("LOSE", 0)
resultScore.set("DRAW", 3)
resultScore.set("WIN", 6)

function findRightChoice(opponentChoice, expectedResult) {
  if (expectedResult == "DRAW") {
    return opponentChoice
  }

  if (expectedResult == "LOSE") {
    return choiceToLose.get(opponentChoice)
  }

  return choiceToWin.get(opponentChoice)
}

aoc.run(function(input) {
    const lines = input.lines()

    var myScore = 0

    for (const line of lines) {
      const [opponentStr, expectedResultStr] = line.split(" ")
      const opponentChoice = mapping.get(opponentStr)
      const expectedResult = resultMapping.get(expectedResultStr)

      myScore += resultScore.get(expectedResult)
      myScore += choiceScore.get(findRightChoice(opponentChoice, expectedResult))
    }

  return myScore
})
