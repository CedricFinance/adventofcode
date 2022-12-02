import * as aoc from '../../2020/aoc.js'

const mapping = new Map()
mapping.set("X", "rock")
mapping.set("A", "rock")
mapping.set("Y", "paper")
mapping.set("B", "paper")
mapping.set("Z", "scissor")
mapping.set("C", "scissor")

const choiceLoseAgainst = new Map()
choiceLoseAgainst.set("rock", "paper")
choiceLoseAgainst.set("paper", "scissor")
choiceLoseAgainst.set("scissor", "rock")

const choiceScore = new Map()
choiceScore.set("rock", 1)
choiceScore.set("paper", 2)
choiceScore.set("scissor", 3)

const outcomeScore = new Map()
outcomeScore.set("LOSE", 0)
outcomeScore.set("DRAW", 3)
outcomeScore.set("WIN", 6)

function playRockPaperScissor(opponent, me) {
  if (opponent == me) {
    return "DRAW"
  }

  if (choiceLoseAgainst.get(opponent) == me) {
    return "WIN"
  }

  return "LOSE"
}

aoc.run(function(input) {
    const lines = input.lines()

    var myScore = 0

    for (const line of lines) {
      const [opponent, me] = line.split(" ").map(i => mapping.get(i))

      myScore += choiceScore.get(me)
      myScore += outcomeScore.get(playRockPaperScissor(opponent, me))
    }
    
  return myScore
})
