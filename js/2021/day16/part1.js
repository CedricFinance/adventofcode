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

function sumVersion(packets) {
    let result = 0
    for (const packet of packets) {
        result += packet.version
        if (packet.subpackets) {
            result += sumVersion(packet.subpackets)
        }
    }
    return result
}

aoc.run(function(input) {
    const data = input.content().split("").flatMap(v => hex2bin[v].split(""))

    var result = 0

    const packets = decodePackets(data)
    console.log(packets);

    result = sumVersion(packets)

    return result
})

