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

passes.sort(function(a, b) {
    return a.seatId - b.seatId;
})

for (let index = 0; index < passes.length - 1; index++) {
    const boardingPass = passes[index];
    const nextPass = passes[index+1];

    if (nextPass.seatId != boardingPass.seatId + 1) {
        console.log(boardingPass.seatId+1);
        break
    }
}