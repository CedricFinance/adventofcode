import * as aoc from '../../2020/aoc.js'

aoc.run(function(input) {
    const numbers = input.numbers()

    var result = 0
    for(var i = 1; i < numbers.length; i++) {
        if (numbers[i] > numbers[i-1]) {
            result++
        }
    }
    
    console.log(result);
    
  return result
})
