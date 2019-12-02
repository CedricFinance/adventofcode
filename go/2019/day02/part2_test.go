package day02

import (
	"github.com/stretchr/testify/assert"
	"testing"
)

func Test_part2(t *testing.T) {
	program := readProgram()

	noun, verb := FindOutput(program, 19690720)

	assert.Equal(t, 90, noun)
	assert.Equal(t, 74, verb)
}
