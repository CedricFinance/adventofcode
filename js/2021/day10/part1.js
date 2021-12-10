import * as aoc from '../../2020/aoc.js'

const pointsByChar = {
  ")": 3,
  "]": 57,
  "}": 1197,
  ">": 25137
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

aoc.run(function(input) {
    const lines = input.lines()

    var result = 0

    for (const line of lines) {
        const error = analyse(line)
        if (error != null) {
            result += pointsByChar[error]
        }
    }

    return result
})

