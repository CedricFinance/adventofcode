package day07

import (
	"fmt"
	"github.com/CedricFinance/adventofcode/2019/lib"
	"gonum.org/v1/gonum/stat/combin"
)

func FindMaxOutputWithFeedbackLoop(originalProgram *lib.Program) int64 {
	var inputs [5]chan int64
	for i := range inputs {
		inputs[i] = make(chan int64, 1)
	}

	permGen := combin.NewPermutationGenerator(5, 5)
	max := int64(0)
	for permGen.Next() {
		phases := permGen.Permutation(nil)

		output := GetSignalWithFeedbackLoop(originalProgram, inputs, phases)

		if output > max {
			max = output
		}
	}

	return max
}

func GetSignalWithFeedbackLoop(originalProgram *lib.Program, inputs [5]chan int64, phases []int) int64 {
	var program *lib.Program

	for i := 0; i < 5; i++ {
		programMemory := make([]int64, len(originalProgram.Data))
		copy(programMemory, originalProgram.Data)
		program = lib.NewProgram(fmt.Sprintf("Program %d", i), programMemory, inputs[i], inputs[(i+1)%len(inputs)])
		program.Input <- int64(phases[i] + 5)
		go program.Run()
	}

	program.Input <- 0

	_ = <-program.Exited
	output := <-program.Input

	return output
}
