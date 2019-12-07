package day07

import (
	"fmt"
	"github.com/CedricFinance/adventofcode/2019/lib"
	"gonum.org/v1/gonum/stat/combin"
)

func FindMaxOutput(originalProgram *lib.Program) int {
	permGen := combin.NewPermutationGenerator(5, 5)
	max := 0

	for permGen.Next() {
		phases := permGen.Permutation(nil)

		signal := GetSignal(originalProgram, phases)

		if signal > max {
			max = signal
		}
	}

	return max
}

func GetSignal(originalProgram *lib.Program, phases []int) int {
	previousInput := 0

	for i := 0; i < 5; i++ {
		programMemory := make([]int, len(originalProgram.Data))
		copy(programMemory, originalProgram.Data)
		program := lib.NewProgram(fmt.Sprintf("Program %d", i), programMemory, make(chan int), make(chan int))

		go program.Run()

		program.Input <- phases[i]
		program.Input <- previousInput
		previousInput = <-program.Output
	}

	return previousInput
}
