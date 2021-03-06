package day02

import (
	"github.com/CedricFinance/adventofcode/2019/lib"
	"github.com/stretchr/testify/assert"
	"testing"
)

func Test_part2(t *testing.T) {
	data := lib.ReadData("input.txt")

	noun, verb := FindOutput(data, 19690720)

	assert.Equal(t, 90, noun)
	assert.Equal(t, 74, verb)
}
