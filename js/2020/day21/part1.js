import * as aoc from '../aoc.js'

function parse(str) {
    const [ingredientsStr, allergensStr] = str.slice(0, str.length - 1).split(" (contains ")
    return {
        ingredients: ingredientsStr.split(" "),
        allergens: new Set(allergensStr.split(", "))
    }
}

aoc.run(function(input) {
    const foods = input.lines().map(parse)

    const allergensMap = new Map()
    for (const food of foods) {
        for (const ingredient of food.ingredients) {
            let possibleAllergens = allergensMap.get(ingredient) || new Map()
            food.allergens.forEach(a => possibleAllergens.set(a, 1 + (possibleAllergens.get(a) || 0)))
            allergensMap.set(ingredient, possibleAllergens)
        }
    }

    let result = 0

    const maxPerAllergen = new Map()
    for (const [_, possibleAllergens] of allergensMap.entries()) {
        for (const [possibleAllergen, count] of possibleAllergens.entries()) {
            const max = Math.max(maxPerAllergen.get(possibleAllergen) || 0, count)
            maxPerAllergen.set(possibleAllergen, max)
        }
    }

    const r = []
    for (const [ingredient, possibleAllergens] of allergensMap.entries()) {
        for (const [possibleAllergen, count] of possibleAllergens.entries()) {
            if (count !== maxPerAllergen.get(possibleAllergen)) {
                possibleAllergens.delete(possibleAllergen)
            }
        }
        if (possibleAllergens.size === 0) {
            r.push(ingredient)
        }
    }

    for (const food of foods) {
        for (const ingredient of food.ingredients) {
            if (r.includes(ingredient)) {
                result++
            }
        }
    }

    return result
})
