import * as path from 'path'
import * as readline from 'readline'
import * as fs from 'fs'

export const Sets = {

    /**
     * @template T
     * @param {Set<T>} first
     * @param {Set<T>} second
     * @returns {Set<T>}
     */
    intersect(first, second) {
        var biggest, smallest
        if (first.size < second.size) {
            smallest = first
            biggest = second
        } else {
            smallest = second
            biggest = first
        }

        const result = new Set()
        for (const elem of smallest) {
            if (biggest.has(elem)) {
                result.add(elem)
            }
        }

        return result
    }
}

/**
 * MATH
 */


/**
 * @param {number} a
 * @param {number} b
 */
function gcd(a, b) {
    while(b != 0) {
        let temp = a % b
        a = b
        b = temp
    }
    
    return a
}
  
/**
 * @param {number} a
 * @param {number} b
 */
function lcm(a, b) {
    let d = math.gcd(a, b)
    return a / d * b
}

export const math = {
    gcd,
    lcm
}


/**
 * ALGOS
 */ 
 
/**
 * @template T
 * @param {(state: T) => T} f
 * @param {T} initialState
 * @param {(firstSate: T, secondState: T) => boolean} eqFct
 */
function floydCycleDetection(f, initialState, eqFct) {
    let tortoise = f(initialState)
    let hare = f(f(initialState))
  
    while (!eqFct(tortoise, hare)) {
        tortoise = f(tortoise)
        hare = f(f(hare))
    }
  
    let mu = 0
    tortoise = initialState
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

export const algos = {
    floydCycleDetection
}

/**
 * OTHER
 */


/**
* @param {string} str
*/
export function parseNumberList(str) {
 return str.split(/ +/).map(s => parseInt(s, 10))
}

export class AocInput {

    constructor(filepath) {
        this.filepath = filepath
    }

    name() {
        return path.basename(this.filepath)
    }

    content() {
        return fs.readFileSync(this.filepath, "utf-8").trim()
    }

    rawContent() {
        return fs.readFileSync(this.filepath, "utf-8")
    }

    lines() {
        return this.content().split("\n")
    }

    numbers() {
        return this.lines().map(x => parseInt(x, 10))
    }

    blocks() {
        return this.rawContent().split("\n\n")
    }
}

export function input(name = "input.txt") {
    return inputForDay(path.dirname(currentScript()), name)
}

function currentScript() {
    return process.argv[1]
}

function inputForDay(dayPath, name) {
    const inputsFolder = toInputsFolder(dayPath)
    return new AocInput(path.join(inputsFolder, name))
}

function toInputsFolder(dayPath) {
    const parts = []
    let currentPath = dayPath
    for (let index = 0; index < 3; index++) {
        parts.push(path.basename(currentPath))
        currentPath = path.dirname(currentPath)
    }

    const [day, year, language] = parts
    const aocRoot = currentPath

    return path.join(aocRoot, "inputs", year, day)
}

/**
 * This callback is called with the problem input.
 * @callback runCallback
 * @param {AocInput} input
 * @returns {string|number}
 */

/**
 * @param {runCallback} callback
 */
export async function run(callback) {
    let inputName
    if (process.argv.length > 2) {
        inputName = process.argv[2]
    }

    try {
        const aocInput = input(inputName)
        console.log("Solving problem with '%s'", aocInput.name())
        console.time("Time taken")
        const result = await callback(aocInput)
        console.timeEnd("Time taken")

        const prefix = path.basename(aocInput.name(), ".txt")
        const part = path.basename(currentScript(), ".js")
        const expectedResultFilename = `${prefix}-${part}-expected.json`
        const expectedResultFilepath = path.join(path.dirname(aocInput.filepath), expectedResultFilename)

        if (fs.existsSync(expectedResultFilepath)) {
            const expectedResult = fs.readFileSync(expectedResultFilepath, "utf-8")
            if (expectedResult === String(result)) {
                console.log("✅ You got the expected result:", result)
            } else {
                console.log("❎ You don't have the expected result: got '%s', expecting '%s", result, expectedResult)
            }
        } else {
            console.log("You found:", result);

            if (process.stdout.isTTY && await saveResult()) {
                console.log(`Saving expected result in ${expectedResultFilename}`)
                fs.writeFileSync(expectedResultFilepath, String(result), "utf-8")
            }
        }
    } catch(ex) {
        console.error(ex)
    }
}

function yesNoQuestion(text) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise(resolve => {
        rl.question(`${text} (y|N)`, (answer) => {
            rl.close();
            resolve(answer)
        });
    })
}

async function saveResult() {
    const save = await yesNoQuestion("Is this the right answer?")
    return save.toLowerCase() == "y"
}
