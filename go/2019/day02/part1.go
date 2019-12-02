package day02

func run(program []int) {
	pc := 0
	for program[pc] != 99 {
		opcode := program[pc]
		left := program[pc+1]
		right := program[pc+2]
		dest := program[pc+3]

		if opcode == 1 {
			program[dest] = program[left] + program[right]
		} else if opcode == 2 {
			program[dest] = program[left] * program[right]
		}

		pc += 4
	}
}
