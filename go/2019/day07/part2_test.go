package day07

import (
	"github.com/CedricFinance/adventofcode/2019/lib"
	"github.com/stretchr/testify/assert"
	"testing"
)

func Test_Part2(t *testing.T) {
	originalMemory := lib.ReadProgram("input.txt")

	assert.Equal(t, 17956613, FindMaxOutputWithFeedbackLoop(originalMemory))
}

func Test_Part2_Ex1(t *testing.T) {
	originalMemory := lib.ReadProgram("part2_ex1.txt")

	assert.Equal(t, 139629729, FindMaxOutputWithFeedbackLoop(originalMemory))
}
