import * as aoc from '../../2020/aoc.js'
import { hash } from './lib.js';

aoc.run(function(input) {
  const strings = input.content().trim().split(",");

  var result = 0
  for (let i = 0; i < strings.length; i++) {
    result += hash(strings[i])
  }

  return result
})
