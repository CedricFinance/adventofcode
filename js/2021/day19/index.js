export function parseScanners(input) {
    const scanners = input.blocks().map((block, id) => {
        const lines = block.split("\n")
        const name = lines.shift()
        const positions = lines.map(line => line.split(",").map(s => parseInt(s, 10)))
        return { id, name, positions, rotations: null, deltas: null, deltasMap: null, position: null }
    })

    return scanners
}