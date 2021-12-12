import * as aoc from '../../2020/aoc.js'

class Node {
    name
    neigbors

    constructor(name) {
        this.name = name
        this.neigbors = []
    }
}

/**
 *
 * @param {Map<string,Node>} nodes
 * @param {string} from
 * @param {string} to
 * @param {Set<string>} marked
 * @returns
 */
function countPaths(nodes, from, to, marked) {
    if (from == to) {
        return 1
    }

    if (marked.has(from)) {
        return 0
    }

    var paths = 0

    const node = nodes.get(from)

    var newMarked = marked
    if (from[0] >= 'a' && from[0] <= 'z') {
        newMarked = new Set(marked)
        newMarked.add(from)
    }

    for (const neighbor of node.neigbors) {
        paths += countPaths(nodes, neighbor, to, newMarked)
    }

    return paths
}

aoc.run(function(input) {
    const lines = input.lines()

    const links = lines.map(line => line.split("-"))

    /** @type Map<string,Node> */
    const nodes = new Map()

    for (const [a, b] of links) {
        const a_node = nodes.get(a) || new Node(a)
        a_node.neigbors.push(b)
        nodes.set(a, a_node)

        const b_node = nodes.get(b) || new Node(b)
        b_node.neigbors.push(a)
        nodes.set(b, b_node)
    }

    /** @type Set<string> */
    const marked = new Set()

    var result = countPaths(nodes, "start", "end", marked)

    return result
})

