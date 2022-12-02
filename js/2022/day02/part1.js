import * as aoc from '../../2020/aoc.js'

const mapping = new Map()
mapping.set("X", "rock")
mapping.set("A", "rock")
mapping.set("Y", "paper")
mapping.set("B", "paper")
mapping.set("Z", "scissor")
mapping.set("C", "scissor")

const choiceScore = new Map()
choiceScore.set("rock", 1)
choiceScore.set("paper", 2)
choiceScore.set("scissor", 3)

const choiceToWin = new Map()
choiceToWin.set("rock", "paper")
choiceToWin.set("paper", "scissor")
choiceToWin.set("scissor", "rock")

aoc.run(function(input) {
    const lines = input.lines()

    var myScore = 0

    for (const line of lines) {
      const [opponent, me] = line.split(" ").map(i => mapping.get(i))

      myScore += choiceScore.get(me)

      if (opponent == me) {
        myScore += 3
      } else if (choiceToWin.get(opponent) == me) {
        myScore += 6
      }
    }
    
  return myScore
})
