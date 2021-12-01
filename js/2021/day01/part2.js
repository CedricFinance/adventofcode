import * as aoc from '../../2020/aoc.js'

aoc.run(function(input) {
    const numbers = input.numbers()

    var result = 0
    var currentSum = numbers[0] + numbers[1] + numbers[2]
    
    for(var i = 3; i < numbers.length; i++) {
        var newSum = currentSum + numbers[i]
        newSum -= numbers[i - 3]
    
        if (newSum > currentSum) {
            result++
        }
    
        currentSum = newSum
    }
    
    return result
})
