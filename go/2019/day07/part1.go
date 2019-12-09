package day07

import (
	"fmt"
	"github.com/CedricFinance/adventofcode/2019/lib"
	"gonum.org/v1/gonum/stat/combin"
)

func FindMaxOutput(originalProgram *lib.Program) int64 {
	permGen := combin.NewPermutationGenerator(5, 5)
	max := int64(0)

	for permGen.Next() {
		phases := permGen.Permutation(nil)

		signal := GetSignal(originalProgram, phases)

		if signal > max {
			max = signal
		}
	}

	return max
}

func GetSignal(originalProgram *lib.Program, phases []int) int64 {
	previousInput := int64(0)

	for i := 0; i < 5; i++ {
		programMemory := make([]int64, len(originalProgram.Data))
		copy(programMemory, originalProgram.Data)
		program := lib.NewProgram(fmt.Sprintf("Program %d", i), programMemory, make(chan int64), make(chan int64))

		go program.Run()

		program.Input <- int64(phases[i])
		program.Input <- previousInput
		previousInput = <-program.Output
	}

	return previousInput
}
