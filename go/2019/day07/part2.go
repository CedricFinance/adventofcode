package day07

import (
	"fmt"
	"github.com/CedricFinance/adventofcode/2019/lib"
	"gonum.org/v1/gonum/stat/combin"
)

func FindMaxOutputWithFeedbackLoop(originalProgram *lib.Program) int {
	var inputs [5]chan int
	for i := range inputs {
		inputs[i] = make(chan int, 1)
	}

	permGen := combin.NewPermutationGenerator(5, 5)
	max := 0
	for permGen.Next() {
		phases := permGen.Permutation(nil)

		output := GetSignalWithFeedbackLoop(originalProgram, inputs, phases)

		if output > max {
			max = output
		}
	}

	return max
}

func GetSignalWithFeedbackLoop(originalProgram *lib.Program, inputs [5]chan int, phases []int) int {
	var program *lib.Program

	for i := 0; i < 5; i++ {
		programMemory := make([]int, len(originalProgram.Data))
		copy(programMemory, originalProgram.Data)
		program = lib.NewProgram(fmt.Sprintf("Program %d", i), programMemory, inputs[i], inputs[(i+1)%len(inputs)])
		program.Input <- phases[i] + 5
		go program.Run()
	}

	program.Input <- 0

	_ = <-program.Exited
	output := <-program.Input

	return output
}
