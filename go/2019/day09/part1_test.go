package day09

import (
	"github.com/CedricFinance/adventofcode/2019/lib"
	"github.com/stretchr/testify/assert"
	"testing"
)

func Test_part1(t *testing.T) {
	program := lib.ReadProgramM("input.txt", 10000)

	go program.Run()
	program.Input <- 1

	assert.Equal(t, int64(4006117640), <-program.Output)
}

func Test_ex1(t *testing.T) {
	program := lib.ReadProgramM("ex1.txt", 86)

	go program.Run()

	outputs := GetOutputs(program)
	assert.Equal(t, []int64{109, 1, 204, -1, 1001, 100, 1, 100, 1008, 100, 16, 101, 1006, 101, 0, 99}, outputs)
}

func Test_ex2(t *testing.T) {
	program := lib.ReadProgram("ex2.txt")

	go program.Run()

	outputs := GetOutputs(program)
	assert.Equal(t, []int64{1219070632396864}, outputs)
}

func Test_ex3(t *testing.T) {
	program := lib.ReadProgram("ex3.txt")

	go program.Run()

	outputs := GetOutputs(program)
	assert.Equal(t, []int64{1125899906842624}, outputs)
}

func GetOutputs(program *lib.Program) []int64 {
	var results []int64

	running := true
	for running {
		select {
		case output := <-program.Output:
			results = append(results, output)
		case <-program.Exited:
			running = false
		}
	}

	return results
}
