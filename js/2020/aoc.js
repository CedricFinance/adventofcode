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
    return inputForDay(path.dirname(process.argv[1]), name)
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

export function run(callback) {
    let inputName
    if (process.argv.length > 2) {
        inputName = process.argv[2]
    }
    const aocInput = input(inputName)
    console.log("Solving problem with '%s'", aocInput.name())
    const result = callback(aocInput)
    console.log("result:", result);
}