package day19

import (
	"fmt"
	"github.com/CedricFinance/adventofcode/2019/lib"
)

func CountAffectedPoints(memory []int64) int {
	count := 0
	for y := 0; y < 50; y++ {
		beamDetected := false
		for x := 0; x < 50; x++ {
			v := DetectBeam(memory, x, y)

			if v {
				beamDetected = true
				fmt.Print("#")
				count++
			} else {
				fmt.Print(".")
				if beamDetected {
					break
				}
			}
		}
		fmt.Println()
	}
	return count
}

func DetectBeam(originalMemory []int64, x int, y int) bool {
	programMemory := lib.NewMapMemory(originalMemory)

	program := lib.NewProgram("Program", programMemory)

	go program.Run()

	program.Input <- int64(x)
	program.Input <- int64(y)
	out := <-program.Output
	_ = <-program.Exited

	return out == 1
}
