import * as aoc from '../../2020/aoc.js'

const pointsByChar = {
    ")": 1,
    "]": 2,
    "}": 3,
    ">": 4
  }

const closes = {
  "(": ")",
  "[": "]",
  "{": "}",
  "<": ">",
}

function analyse(line) {
    const stack = []
    for (const c of line) {
        if ("([{<".includes(c)) {
            stack.push(c)
        } else {
            if (stack.length == 0 || c != closes[stack.pop()]) {
                return c
            }
        }
    }
    return null
}


function complete(line) {
    const stack = []
    for (const c of line) {
        if ("([{<".includes(c)) {
            stack.push(c)
        } else {
            stack.pop()
        }
    }

    var score = 0

    for (const c of stack.reverse()) {
        score = score * 5 + pointsByChar[closes[c]]
    }
    return score
}

aoc.run(function(input) {
    const lines = input.lines()

    var result = []

    for (const line of lines) {
        const error = analyse(line)
        if (error != null) {
            continue
        }

        result.push(complete(line))
    }

    result.sort((a, b) => a - b)

    return result[(result.length-1) / 2]
})

