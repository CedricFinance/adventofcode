import * as path from 'path';
import * as fs from 'fs'

class AocInput {

    constructor(filepath) {
        this.filepath = filepath
    }

    name() {
        return path.basename(this.filepath)
    }

    content() {
        return fs.readFileSync(this.filepath, "utf-8").trim()
    }

    lines() {
        return this.content().split("\n")
    }

    blocks() {
        return this.content().split("\n\n")
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
    const aocInput = input(inputName)
    console.log("Solving problem with '%s'", aocInput.name())
    const result = callback(aocInput)

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

        if (await saveResult()) {
            console.log(`Saving expected result in ${expectedResultFilename}`)
            fs.writeFileSync(expectedResultFilepath, String(result), "utf-8")
        }
    }
}

import * as readline from 'readline'

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