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


class Packet {
    /** @type number */
    version

    /** @type number */
    type

    /**
     *
     * @param {number} version
     * @param {number} type
     */
    constructor(version, type) {
        this.version = version
        this.type = type
    }
}

class LiteralPacket extends Packet {

    /** @type number */
    value

    /**
     *
     * @param {number} version
     * @param {number} value
     */
    constructor(version, value) {
        super(version, 4)
        this.value = value
    }
}

class OperatorPacket extends Packet {

    /** @type Packet[] */
    subpackets

    /**
     *
     * @param {number} version
     * @param {number} type
     * @param {Packet[]} subpackets
     */
    constructor(version, type, subpackets) {
        super(version, type)
        this.subpackets = subpackets
    }
}

/**
 *
 * @param {string[]} data
 */
function decodePackets(data, count = Number.MAX_VALUE) {
    const packets = []
    let remaining = count
    while(data.length > 0 && remaining > 0) {
        packets.push(decodePacket(data))
        remaining--
    }
    return packets
}

/**
 *
 * @param {string[]} data
 */
 function decodePacket(data) {
    const version = parseInt(data.splice(0, 3).join(""), 2)
    const type = parseInt(data.splice(0, 3).join(""), 2)
    if (type == 4) {
        //literal
        const allbits = []
        var bits = []
        do {
            bits = data.splice(0, 5)
            allbits.push(...bits.slice(1))
        } while(bits[0] == '1')
        const value = parseInt(allbits.join(""), 2)
        return new LiteralPacket(version, value)
    }

    // operator
    const lengthType = parseInt(data.splice(0, 1).join(""), 2)
    if (lengthType == 0) {
        const totalLength = parseInt(data.splice(0, 15).join(""), 2)
        return new OperatorPacket(
            version,
            type,
            decodePackets(data.splice(0, totalLength))
        )
    } else {
        const subPacketsCount = parseInt(data.splice(0, 11).join(""), 2)
        return new OperatorPacket(
            version,
            type,
            decodePackets(data, subPacketsCount)
        )
    }
}

function sumVersion(packet) {
    let result = packet.version

    if (packet.subpackets) {
        for (const subpacket of packet.subpackets) {
            result += sumVersion(subpacket)
        }
    }

    return result
}

aoc.run(function(input) {
    const data = input.content().split("").flatMap(v => hex2bin[v].split(""))

    const packets = decodePacket(data)
    console.log(packets);

    return sumVersion(packets)
})

