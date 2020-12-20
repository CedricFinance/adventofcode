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

    /*
    byr (Birth Year) - four digits; at least 1920 and at most 2002.
    iyr (Issue Year) - four digits; at least 2010 and at most 2020.
    eyr (Expiration Year) - four digits; at least 2020 and at most 2030.
    hgt (Height) - a number followed by either cm or in:
    If cm, the number must be at least 150 and at most 193.
    If in, the number must be at least 59 and at most 76.
    hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
    ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
    pid (Passport ID) - a nine-digit number, including leading zeroes.
    cid (Country ID) - ignored, missing or not.
    */

    function isIntBetween(str, min, max) {
        const val = parseInt(str, 10)
        return val >= min && val <= max
    }

    function isHex(str) {
        for (const char of str) {
            if (!((char >= '0' && char <= '9') || (char >= 'a' && char <= 'f'))) {
                return false
            }
        }
        return true
    }

    function onlyDigits(str) {
        for (const char of str) {
            if (!(char >= '0' && char <= '9')) {
                return false
            }
        }
        return true
    }

    function isEyeColor(str) {
        const validColors = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"];

        return validColors.includes(str)
    }

    function isHeight(str) {
        const value = str.slice(0, str.length-2)
        const unit = str.slice(str.length-2)

        if (unit === "cm") {
            return isIntBetween(value, 150, 193)
        } else {
            return isIntBetween(value, 59, 76)
        }
    }

    const validators = {
        "byr": function(str) { return str.length == 4 && isIntBetween(str, 1920, 2002) },
        "iyr": function(str) { return str.length == 4 && isIntBetween(str, 2010, 2020) },
        "eyr": function(str) { return str.length == 4 && isIntBetween(str, 2020, 2030) },
        "hgt": isHeight,
        "hcl": function(str) { return str[0] === "#" && isHex(str.slice(1)) },
        "ecl": isEyeColor,
        "pid": function(str) { return str.length == 9 && onlyDigits(str) },
        "cid": function(str) { return true }
    }


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
            if (!passport.has(field) || !validators[field](passport.get(field)) ) {
                return false
            }
        }

        return true
    }

    console.log("number of passports:", passports.length)

    return passports.filter(isValid).length
})