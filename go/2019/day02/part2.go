package day02

import "github.com/CedricFinance/adventofcode/2019/lib"

func FindOutput(originalProgram *lib.Program, value int64) (int, int) {
	data := make([]int64, len(originalProgram.Data))

	program := lib.NewProgram("Program", data, make(chan int64), make(chan int64))

	for noun := 0; noun <= 99; noun++ {
		for verb := 0; verb <= 99; verb++ {

			copy(program.Data, originalProgram.Data)
			program.Data[1] = int64(noun)
			program.Data[2] = int64(verb)

			go program.Run()
			_ = <-program.Exited

			if program.Data[0] == value {
				return noun, verb
			}
		}
	}

	return -1, -1
}
