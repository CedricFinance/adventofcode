import * as fs from 'fs'

const lines = fs.readFileSync("input.txt", "utf-8").trim().split("\n")

function parseBagCount(str) {
    if (str === "no other bags.") { return null }

    const parts = str.split(" ")
    const count = parseInt(parts[0])

    const color = parts[1] + " " + parts[2]

    return {
        color,
        count
    }
}

// pale cyan bags contain 2 posh black bags, 4 wavy gold bags, 2 vibrant brown bags.
function parseRule(str) {
    const [sourceColor, contentStr] = str.split(" bags contain ")
    
    const contentParts = contentStr.split(", ")
    const content = contentParts.map(parseBagCount).filter(c => c !== null)

    return {
        sourceColor,
        content
    }
}

const rules = lines.map(parseRule)

console.log("%d rules", rules.length);

const mapping = new Map()
rules.forEach(rule => {
    mapping.set(rule.sourceColor, rule.content)
});

function countBags(color, mapping, cache) {
    let count = 0;

    if (cache.has(color)) {
        return cache.get(color)
    }

    mapping.get(color).forEach(bagCount => {
        count += bagCount.count
        count += bagCount.count * countBags(bagCount.color, mapping, cache)
    })

    cache.set(color, count)

    return count;
}

console.log(countBags("shiny gold", mapping, new Map()));