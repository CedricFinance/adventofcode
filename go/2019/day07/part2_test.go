package day07

import (
	"github.com/CedricFinance/adventofcode/2019/lib"
	"github.com/stretchr/testify/assert"
	"testing"
)

func Test_Part2(t *testing.T) {
	data := lib.ReadData("input.txt")

	assert.Equal(t, int64(17956613), FindMaxOutputWithFeedbackLoop(data))
}

func Test_Part2_Ex1(t *testing.T) {
	data := lib.ReadData("part2_ex1.txt")

	assert.Equal(t, int64(139629729), FindMaxOutputWithFeedbackLoop(data))
}
