import * as aoc from '../../2020/aoc.js'

const mapping = new Map()
mapping.set("A", "rock")
mapping.set("B", "paper")
mapping.set("C", "scissor")

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
resultScore.set("X", 0)
resultScore.set("Y", 3)
resultScore.set("Z", 6) 

aoc.run(function(input) {
    const lines = input.lines()

    var myScore = 0

    for (const line of lines) {
      const [opponent, expectedResult] = line.split(" ")
      const opponentChoice = mapping.get(opponent)

      myScore += resultScore.get(expectedResult)

      var me
      if (expectedResult == "Y") {
        me = opponentChoice
      } else if (expectedResult == "X") {
        me = choiceToLose.get(opponentChoice)
      } else {
        me = choiceToWin.get(opponentChoice)
      }
      myScore += choiceScore.get(me)
    }
    
  return myScore
})
