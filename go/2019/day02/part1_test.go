package day02

import (
	"github.com/stretchr/testify/assert"
	"testing"
)

func Test_part1(t *testing.T) {
	program := readProgram()
	program[1] = 12
	program[2] = 2

	run(program)

	assert.Equal(t, 2842648, program[0])
}
