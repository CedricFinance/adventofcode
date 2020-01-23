package day02

import "github.com/CedricFinance/adventofcode/2019/lib"

func FindOutput(originalData []int64, value int64) (int, int) {

	for noun := 0; noun <= 99; noun++ {
		for verb := 0; verb <= 99; verb++ {

			data := make([]int64, len(originalData))
			copy(data, originalData)
			mem := lib.NewSliceMemory(data)
			program := lib.NewProgram("Program", mem)

			program.Data.Write(1, int64(noun))
			program.Data.Write(2, int64(verb))

			go program.Run()
			_ = <-program.Exited

			if program.Data.Read(0) == value {
				return noun, verb
			}
		}
	}

	return -1, -1
}
