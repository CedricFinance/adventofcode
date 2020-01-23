package day07

import (
	"fmt"
	"github.com/CedricFinance/adventofcode/2019/lib"
	"gonum.org/v1/gonum/stat/combin"
)

func FindMaxOutputWithFeedbackLoop(originalData []int64) int64 {
	var inputs [5]chan int64
	for i := range inputs {
		inputs[i] = make(chan int64, 1)
	}

	permGen := combin.NewPermutationGenerator(5, 5)
	max := int64(0)
	for permGen.Next() {
		phases := permGen.Permutation(nil)

		output := GetSignalWithFeedbackLoop(originalData, inputs, phases)

		if output > max {
			max = output
		}
	}

	return max
}

func GetSignalWithFeedbackLoop(originalData []int64, inputs [5]chan int64, phases []int) int64 {
	var program *lib.Program

	for i := 0; i < 5; i++ {
		data := make([]int64, len(originalData))
		copy(data, originalData)
		mem := lib.NewSliceMemory(data)
		program = lib.NewProgramI(fmt.Sprintf("Program %d", i), mem, inputs[i], inputs[(i+1)%len(inputs)])
		program.Input <- int64(phases[i] + 5)
		go program.Run()
	}

	program.Input <- 0

	_ = <-program.Exited
	output := <-program.Input

	return output
}
