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
    let left
    if (parser.peak() == "(") {
        parser.accept("(")
        left = parseMult(parser)
        if (!parser.accept(')')) {
            console.error("expecting ')' got %s", parser.str[0], parser)
            process.exit(1)
        }
    } else {
        left = parser.readNumber()
    }
    return left
}

function parseMult(parser) {
    let left = parseAdd(parser)
    while (parser.peak() == "*") {
        parser.accept("*")
        const right = parseMult(parser)
        left = {
            left, operator: '*', right
        }
    }
    return left
}

function parseAdd(parser) {
    let left = parseParentheses(parser)
    while (parser.peak() == "+") {
        parser.accept("+")
        const right = parseAdd(parser)
        left = {
            left, operator: '+', right
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
        const result = ops[ast.operator](left, right)
        return "(" + left + operator + right + ")"
    }

    return ""+ast
}

function parseAndEvaluate(str) {
    const parser = new Parser(str)
    const ast = parseMult(parser)
    const result =  evaluate(ast)

    return result
}

function assertEval(str, value) {
    const result = parseAndEvaluate(str)
    if (result != value) {
        console.error("%s != %d got %d", str, value, result)
    }
}

assertEval("1 + 2", 3)
assertEval("2 * 3 + 1", 8)
assertEval("1 + (2 * 3) + (4 * (5 + 6))", 51)
assertEval("2 * 3 + (4 * 5)", 46)
assertEval("5 + (8 * 3 + 9 + 3 * 4 * 3)", 1445)

const numbers = lines.map(parseAndEvaluate)

console.log("result:", numbers.reduce((acc, v) =>  acc + v, 0));
