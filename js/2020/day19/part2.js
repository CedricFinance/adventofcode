import * as aoc from '../aoc.js'

aoc.run(function(input) {
    const [rulesBlock, messagesBlock] = input.blocks()

    const messages = messagesBlock.split("\n")

    const maxLength = messages.map(m => m.length).sort((a,b) => b - a)[0]

    console.log("Max length", maxLength)

    function parseRule(str) {
        const [id, content] = str.split(": ")

        if (content[0] === '"') {
            const matches = content.slice(1, content.length - 1)

            return {
                id: parseInt(id, 10),
                matches
            }
        }

        const subrulesList = content.split(" | ").map(c => c.split(" ").map(s => parseInt(s, 10)))

        return {
            id: parseInt(id, 10),
            subrulesList
        }

    }

    const rulesList = rulesBlock.split("\n").map(parseRule)
    const rules = []
    for (const rule of rulesList) {
        rules[rule.id] = rule
    }

    function computeRegexp(rules, index) {
        const rule = rules[index]

        if (rule.matches) {
            return rule.matches
        }

        if (index == 8) {
            return `(${computeRegexp(rules, 42)})+`
        }

        if (index == 11) {
            const r42 = computeRegexp(rules, 42)
            const r31 = computeRegexp(rules, 31)
            const subregexps = []
            for (let index = 1; index < maxLength / 2; index++) {
                subregexps.push(`(${r42}){${index}}(${r31}){${index}}`)
            }
            return `(${subregexps.join("|")})`
        }

        const subregexps = rule.subrulesList.map(subrules => subrules.map(sub => computeRegexp(rules, sub)).join(""))

        let matches
        if (subregexps.length == 1) {
            matches = subregexps[0]
        } else {
            matches = `(${subregexps.join("|")})`
        }

        rule.matches = matches

        return matches
    }

    computeRegexp(rules, 0)

    function isValid(str, regexp) {
        return str.match(regexp)
    }

    let regexp = `^${rules[0].matches}$`
    let count = 0
    for (const message of messages) {
        if (isValid(message, regexp)) {
            count++
        }
    }

    return count
})