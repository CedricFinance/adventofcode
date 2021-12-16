import * as aoc from '../../2020/aoc.js'

const hex2bin = {
    "0": "0000",
    "1": "0001",
    "2": "0010",
    "3": "0011",
    "4": "0100",
    "5": "0101",
    "6": "0110",
    "7": "0111",
    "8": "1000",
    "9": "1001",
    "A": "1010",
    "B": "1011",
    "C": "1100",
    "D": "1101",
    "E": "1110",
    "F": "1111",
}


/**
 *
 * @param {string[]} data
 */
function decodePackets(data, count = Number.MAX_VALUE) {
    let d = data
    const packets = []
    let remaining = count
    while(d.length > 0 && remaining > 0) {
        const version = parseInt(d.splice(0, 3).join(""), 2)
        const type = parseInt(d.splice(0, 3).join(""), 2)
        if (type == 4) {
            //literal
            const allbits = []
            var bits = []
            do {
                bits = d.splice(0, 5)
                allbits.push(...bits.slice(1))
            } while(bits[0] == '1')
            const value = parseInt(allbits.join(""), 2)
            packets.push({
                version,
                type,
                value
            })
            //d.splice(0,3) //trailing
        } else {
            // operator
            const lengthType = parseInt(d.splice(0, 1).join(""), 2)
            if (lengthType == 0) {
                const totalLength = parseInt(d.splice(0, 15).join(""), 2)
                packets.push({
                    version,
                    type,
                    lengthType,
                    totalLength,
                    subpackets: decodePackets(d.splice(0, totalLength))
                })
            } else {
                const subPacketsCount = parseInt(d.splice(0, 11).join(""), 2)
                packets.push({
                    version,
                    type,
                    lengthType,
                    subPacketsCount,
                    subpackets: decodePackets(d, subPacketsCount)
                })
            }
        }
        remaining--
    }
    return packets
}

function evalPacket(packet) {

    if (packet.type == 4) {
        return packet.value
    }

    const values = packet.subpackets.map(evalPacket)

    switch (packet.type) {
        case 0:
            return values.reduce((acc, value) => acc + value, 0)

        case 1:
            return values.reduce((acc, value) => acc * value, 1)

        case 2:
            return Math.min(...values)

        case 3:
            return Math.max(...values)

        case 5:
            return (values[0] > values[1]) ? 1 : 0

        case 6:
            return (values[0] < values[1]) ? 1 : 0

        case 7:
            return (values[0] == values[1]) ? 1 : 0

    }
}

aoc.run(function(input) {
    const data = input.content().split("").flatMap(v => hex2bin[v].split(""))

    var result = 0

    const packets = decodePackets(data)
    console.log(packets);

    result = evalPacket(packets[0])

    return result
})

