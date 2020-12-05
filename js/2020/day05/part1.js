fs = require('fs')
const lines = fs.readFileSync("input.txt", "utf-8").trim().split("\n")

function decodeBoardingPass(str) {
   const rowStr = str.slice(0, 7)
   const colStr = str.slice(7)

   const row = parseInt(rowStr.replace(/F/g, '0').replace(/B/g, '1'), 2)
   const col = parseInt(colStr.replace(/L/g, '0').replace(/R/g, '1'), 2)

   return {
       row, col,
       seatId: row * 8 + col
   }
}

const passes = lines.map(decodeBoardingPass)

const ids = passes.map(p => p.seatId).sort(function(a, b) {
    return -(a - b);
})

console.log(
    ids[0]
);
