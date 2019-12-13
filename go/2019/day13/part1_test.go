package day13

import (
	"github.com/CedricFinance/adventofcode/2019/lib"
	"github.com/stretchr/testify/assert"
	"testing"
)

func TestPart1(t *testing.T) {
	program := lib.ReadProgramM("input.txt", 10000)

	count := CountBlocks(program)

	assert.Equal(t, 230, count)
}
