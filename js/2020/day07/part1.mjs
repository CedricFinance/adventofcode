import * as fs from 'fs'

const lines = fs.readFileSync("input.txt", "utf-8").trim().split("\n")

function parseBagCount(str) {
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
    const content = contentParts.map(parseBagCount)

    return {
        sourceColor,
        content
    }
}

const rules = lines.map(parseRule)

console.log("%d rules", rules.length);

const mapping = new Map()
rules.forEach(rule => {
    rule.content.forEach(({ color }) => {
        const value = mapping.get(color) || new Set()
        value.add(rule.sourceColor)
        mapping.set(color, value)
    } )
});

const colors = new Set()
let candidates = new Set(mapping.get("shiny gold"))

while(candidates.size > 0) {
    const color = candidates.keys().next().value
    candidates.delete(color)

    if (!colors.has(color)) {
        colors.add(color)
        if (mapping.get(color)) {
            Array.from(mapping.get(color).keys()).forEach(color => candidates.add(color))
        }
    }
}

console.log(colors.size);
