package day07

import (
	"fmt"
	"github.com/CedricFinance/adventofcode/2019/lib"
	"gonum.org/v1/gonum/stat/combin"
)

func FindMaxOutput(originalData []int64) int64 {
	permGen := combin.NewPermutationGenerator(5, 5)
	max := int64(0)

	for permGen.Next() {
		phases := permGen.Permutation(nil)

		signal := GetSignal(originalData, phases)

		if signal > max {
			max = signal
		}
	}

	return max
}

func GetSignal(originalData []int64, phases []int) int64 {
	previousInput := int64(0)

	for i := 0; i < 5; i++ {
		data := make([]int64, len(originalData))
		copy(data, originalData)
		mem := lib.NewSliceMemory(data)
		program := lib.NewProgram(fmt.Sprintf("Program %d", i), mem)

		go program.Run()

		program.Input <- int64(phases[i])
		program.Input <- previousInput
		previousInput = <-program.Output
	}

	return previousInput
}
