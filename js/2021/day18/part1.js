import * as aoc from '../../2020/aoc.js'

function add(first,second) {
    return [first, second]
}

function splitValue(value) {
    return [ Math.floor(value / 2), Math.ceil(value / 2)]
}

function addLeftmost(snailfish, value) {
    if (Number.isInteger(snailfish)) {
        return snailfish + value
    }

    return [addLeftmost(snailfish[0], value), snailfish[1]]
}

function addRightmost(snailfish, value) {
    if (Number.isInteger(snailfish)) {
        return snailfish + value
    }

    return [snailfish[0], addRightmost(snailfish[1], value)]
}

function explode(snailfish, depth = 0) {
    if (Number.isInteger(snailfish)) {
        return { exploded: false, result: snailfish}
    }

    if (depth == 4) {
        return { exploded: true, result: 0, addLeft: snailfish[0], addRight: snailfish[1] }
    }

    const explodeLeft = explode(snailfish[0], depth + 1)
    if (explodeLeft.exploded) {
        if (explodeLeft.addRight) {
            return { exploded: true, result: [explodeLeft.result, addLeftmost(snailfish[1], explodeLeft.addRight)], addLeft: explodeLeft.addLeft }
        }
        return { exploded: true, result: [explodeLeft.result, snailfish[1]], addLeft: explodeLeft.addLeft }
    }

    const explodeRight = explode(snailfish[1], depth + 1)
    if (explodeRight.exploded) {
        if (explodeRight.addLeft) {
            return { exploded: true, result: [addRightmost(snailfish[0], explodeRight.addLeft), explodeRight.result], addRight: explodeRight.addRight }
        }
        return { exploded: true, result: [snailfish[0], explodeRight.result], addRight: explodeRight.addRight }
    }

    return { exploded: false, result: snailfish }
}

function split(snailfish) {
    if (Number.isInteger(snailfish)) {
        if (snailfish >= 10) {
            return { splitted: true, result: splitValue(snailfish) }
        }
        return { splitted: false, result: snailfish }
    }

    var splitLeft = split(snailfish[0])
    if (splitLeft.splitted) {
        return { splitted: true, result: [splitLeft.result, snailfish[1]] }
    }

    var splitRight = split(snailfish[1])
    return { splitted: splitRight.splitted, result: [snailfish[0], splitRight.result]}
}

function reduce(snailfish) {
    let result = snailfish
    while(true) {
        const explodeRes = explode(result)
        if (explodeRes.exploded) {
            result = explodeRes.result
            continue
        }
        const splitRes = split(result)
        if (splitRes.splitted) {
            result = splitRes.result
            continue
        }
        break
    }
    return result
}

function magnitude(snailfish) {
    if (Number.isInteger(snailfish)) {
        return snailfish
    }

    return 3 * magnitude(snailfish[0]) + 2 * magnitude(snailfish[1])
}

aoc.run(function(input) {
    const pairs = input.lines().map(line => JSON.parse(line))

    var currentPair = pairs.shift()
    while(pairs.length > 0) {
        console.log(pairs.length);
        currentPair = add(currentPair, pairs.shift())
        currentPair = reduce(currentPair)
    }

    return magnitude(currentPair)
})

