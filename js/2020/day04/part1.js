import * as aoc from '../aoc.js'

aoc.run(function(input) {
    const lines = input.lines()

    function parsePassports(lines) {
        const passports = []

        var currentPassport = new Map()
        for(var line of lines) {
            if (line === "") {
                passports.push(currentPassport)
                currentPassport = new Map()
            } else {
                line.split(" ").forEach(entry => {
                    const [field, value] = entry.split(":")
                    currentPassport.set(field, value)
                });
            }
        }

        if (currentPassport.size>0) {
            passports.push(currentPassport)
        }

        return passports
    }

    const passports = parsePassports(lines)



    function isValid(passport) {
        const requiredFields = [
            "byr", // (Birth Year)
            "iyr", // (Issue Year)
            "eyr", // (Expiration Year)
            "hgt", // (Height)
            "hcl", // (Hair Color)
            "ecl", // (Eye Color)
            "pid", // (Passport ID)
        ]

        for (const field of requiredFields) {
            if (!passport.has(field)) {
                return false
            }
        }

        return true
    }

    console.log("number of passports:", passports.length)

    return passports.filter(isValid).length
})