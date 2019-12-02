package day02

func FindOutput(originalProgram []int, value int) (int, int) {
	program := make([]int, len(originalProgram))

	for noun := 0; noun <= 99; noun++ {
		for verb := 0; verb <= 99; verb++ {

			copy(program, originalProgram)
			program[1] = noun
			program[2] = verb

			run(program)

			if program[0] == value {
				return noun, verb
			}
		}
	}

	return -1, -1
}
