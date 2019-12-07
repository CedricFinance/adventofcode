package day07

import (
	"github.com/CedricFinance/adventofcode/2019/lib"
	"gonum.org/v1/gonum/stat/combin"
)

func FindMaxOutput(program *lib.Program) int {
	var programs [5]*lib.Program

	for i := range programs {
		programMemory := make([]int, len(program.Data))
		copy(programMemory, program.Data)
		programs[i] = &lib.Program{
			Data:   programMemory,
			Output: 0,
		}
	}

	permGen := combin.NewPermutationGenerator(5, 5)
	max := 0

	for permGen.Next() {
		phases := permGen.Permutation(nil)

		previousInput := 0

		for i, program := range programs {
			program.Run(phases[i], previousInput)
			previousInput = program.Output
		}

		if programs[4].Output > max {
			max = programs[4].Output
		}
	}

	return max
}
