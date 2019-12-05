package day02

import "github.com/CedricFinance/adventofcode/2019/lib"

func FindOutput(originalProgram *lib.Program, value int) (int, int) {
	data := make([]int, len(originalProgram.Data))

	program := lib.Program{
		Data:   data,
		Output: 0,
	}

	for noun := 0; noun <= 99; noun++ {
		for verb := 0; verb <= 99; verb++ {

			copy(program.Data, originalProgram.Data)
			program.Data[1] = noun
			program.Data[2] = verb

			program.Run(0)

			if program.Data[0] == value {
				return noun, verb
			}
		}
	}

	return -1, -1
}
