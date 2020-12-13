import * as fs from 'fs'

const lines = fs.readFileSync("input.txt", "utf-8").trim().split("\n")

const busses = lines[1].split(",").map((s, index) => ({ s, index })).filter(e => e.s != "x").map(e => ({ busID: parseInt(e.s, 10), offset: e.index }))

function floydCycleDetection(f, x0, eqFct) {
    let tortoise = f(x0)
    let hare = f(f(x0))

    while (!eqFct(tortoise, hare)) {
        tortoise = f(tortoise)
        hare = f(f(hare))
    }

    let mu = 0
    tortoise = x0
    while(!eqFct(tortoise, hare)) {
        tortoise = f(tortoise)
        hare = f(hare)
        mu++
    }

    let lam = 1
	hare = f(tortoise)
    while(!eqFct(tortoise, hare)) {
		hare = f(hare)
		lam++
	}

    return { lam, mu }
}

function gcd(a, b) {
	while(b != 0) {
        let temp = a % b
        a = b
        b = temp
	}

	return a
}

function lcm(a, b) {
	let d = gcd(a, b)
	return a / d * b
}

const cycles = []
for (let index = 0; index < busses.length; index++) {
    cycles.push(floydCycleDetection(
        ({ first, second, timestamp }) => {
         return {
            first,
            second,
            state: [first, second].map(bus => (timestamp + bus.offset) % bus.busID),
            timestamp: timestamp + 1
         }
        },
        {
            first: busses[0],
            second: busses[index],
            state: [busses[0], busses[index]].map(bus => (bus.offset) % bus.busID),
            timestamp: 0
        },
        (a, b) => {
            return a.state[0] == b.state[0] && a.state[1] == b.state[1]
        }
        ));
}
console.log(busses);
console.log(cycles);
let multiple = 1;
const multiples = []
for(let cycle of cycles) {
    multiple = lcm(multiple, cycle.lam)
    multiples.push(multiple)
}
console.log(multiples);

let timestamp = 0
let busIndex = 1
while(busIndex < busses.length) {
    timestamp += multiples[busIndex - 1]
    const bus = busses[busIndex]
    if ((timestamp + bus.offset) % bus.busID == 0) {
        console.log("Bus %d ok", busIndex);
        busIndex++
    }
}

console.log(timestamp);
