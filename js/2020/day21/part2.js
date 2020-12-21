import * as aoc from '../aoc.js'

function parse(str) {
    const [ingredientsStr, allergensStr] = str.slice(0, str.length - 1).split(" (contains ")
    return {
        ingredients: new Set(ingredientsStr.split(" ")),
        allergens: new Set(allergensStr.split(", "))
    }
}

function union(first, second) {
    const result = new Set(second)
    for (const item of first) {
        result.add(item)
    }
    return result
}


function intersect(first, second) {
    const result = new Set()
    for (const item of first) {
        if (second.has(item)) {
            result.add(item)
        }
    }
    return result
}

function removeIngredients(foods, ingredients) {
    for (const food of foods) {
        for (const ingredient of food.ingredients) {
            if (ingredients.has(ingredient)) {
                food.ingredients.delete(ingredient)
            }
        }
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

    const maxPerAllergen = new Map()
    for (const [_, possibleAllergens] of allergensMap.entries()) {
        for (const [possibleAllergen, count] of possibleAllergens.entries()) {
            const max = Math.max(maxPerAllergen.get(possibleAllergen) || 0, count)
            maxPerAllergen.set(possibleAllergen, max)
        }
    }

    const safeIngredients = new Set()
    for (const [ingredient, possibleAllergens] of allergensMap.entries()) {
        for (const [possibleAllergen, count] of possibleAllergens.entries()) {
            if (count !== maxPerAllergen.get(possibleAllergen)) {
                possibleAllergens.delete(possibleAllergen)
            }
        }
        if (possibleAllergens.size === 0) {
            safeIngredients.add(ingredient)
        }
    }

    console.log("%d safe ingredients", safeIngredients.size);

    removeIngredients(foods, safeIngredients)

    const newAllergensMap = new Map()
    for (const food of foods) {
        for (const ingredient of food.ingredients) {
            let possibleAllergens = newAllergensMap.get(ingredient) || new Map()
            food.allergens.forEach(a => possibleAllergens.set(a, 1 + (possibleAllergens.get(a) || 0)))
            newAllergensMap.set(ingredient, possibleAllergens)
        }
    }

    for (const [_, possibleAllergens] of newAllergensMap.entries()) {
        for (const [possibleAllergen, count] of possibleAllergens.entries()) {
            if (count !== maxPerAllergen.get(possibleAllergen)) {
                possibleAllergens.delete(possibleAllergen)
            }
        }
    }

    function removeAllergen(allergensMap, allergen) {
        for (const [_, possibleAllergens] of allergensMap.entries()) {
            possibleAllergens.delete(allergen)
        }
    }

    const foundAllergens = new Map()
    while(foundAllergens.size != maxPerAllergen.size) {
        for (const [ingredient, possibleAllergens] of newAllergensMap.entries()) {
            if (possibleAllergens.size === 1) {
                foundAllergens.set(ingredient, possibleAllergens.keys().next().value)
                newAllergensMap.delete(ingredient)
                removeAllergen(newAllergensMap, possibleAllergens.keys().next().value)
                break
            }
        }
    }

    const result = Array.from(foundAllergens.entries())
      .sort(([_1, first], [ _2, second]) => first.localeCompare(second))
      .map(([i, _]) => i)
      .join(",")
    return result
})
