import * as fs from 'fs'

const lines = fs.readFileSync("input.txt", "utf-8").trim().split("\n")

class Parser {

    constructor(str) {
        this.str = str.split("")
    }

    peak() {
        return this.str[0]
    }

    accept(c) {
        this.skipSpaces()
        if (this.str[0] === c) {
            this.str = this.str.slice(1)
            this.skipSpaces()
            return true
        }
        return false
    }

    readNumber() {
        this.skipSpaces()
        let result = 0
        while(this.str.length > 0 && this.str[0] >= '0' && this.str[0] <= '9') {
            result = result * 10 + (this.str[0] - '0')
            this.str = this.str.slice(1)
        }
        this.skipSpaces()
        return result
    }

    readOperator() {
        this.skipSpaces()
        const result = this.str[0]
        this.str = this.str.slice(1)
        this.skipSpaces()
        return result
    }

    skipSpaces() {
        while(this.str[0] === " ") {
            this.str = this.str.slice(1)
        }
    }
}

function parseParentheses(parser) {
    let result
    if (parser.peak() == "(") {
        parser.accept("(")
        result = parseExpression(parser)
        if (!parser.accept(')')) {
            console.error("expecting ')' got %s", parser.str[0], parser)
            process.exit(1)
        }
    } else {
        result = parser.readNumber()
    }
    return result
}

function parseExpression(parser) {
    let left
    let operator
    let right

    left = parseParentheses(parser)

    while(true) {
        operator = parser.peak()

        if (operator === "+" || operator === "*") {
            parser.accept(operator) // hack
            right = parseParentheses(parser)

            left = {
                left, operator, right
            }
        } else {
            break
        }
    }

    return left
}

const ops = {
    "+": function(a, b) { return a + b },
    "*": function(a, b) { return a * b }
}

function evaluate(ast) {
    if (typeof ast === "object") {
        const left = evaluate(ast.left)
        const operator = ast.operator
        const right = evaluate(ast.right)
        const result = ops[operator](left, right)
        return result
    }

    return ast
}

function display(ast) {
    if (typeof ast === "object") {
        const left = display(ast.left)
        const operator = ast.operator
        const right = display(ast.right)
        return "(" + left + operator + right + ")"
    }

    return ""+ast
}

function parseAndEvaluate(str) {
    const parser = new Parser(str)
    const ast = parseExpression(parser)
    const result = evaluate(ast)

    return result
}

function assertEval(str, value) {
    const result = parseAndEvaluate(str)
    if (result != value) {
        console.error("%s != %d got %d", str, value, result)
    }
}

assertEval("1 + 2 * 3 + 4 * 5 + 6", 71)
assertEval("1 + (2 * 3) + (4 * (5 + 6))", 51)
assertEval("2 * 3 + (4 * 5)", 26)
assertEval("5 + (8 * 3 + 9 + 3 * 4 * 3)", 437)
assertEval("5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))", 12240)
assertEval("((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2", 13632)
assertEval("(4 * 5 * 7 * 6 + 6 + (2 * 8 * 6 + 2 + 9)) + 4 + 7", 964)
assertEval("9 * (9 + 4 + (6 + 2 + 8 + 6 * 4) * 6 + (7 + 7 + 9)) + 9", 5670)

const numbers = lines.map(parseAndEvaluate)

console.log("result:", numbers.reduce((acc, v) => acc + v, 0));
