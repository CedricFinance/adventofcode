package day05

import (
	"github.com/CedricFinance/adventofcode/2019/lib"
	"github.com/stretchr/testify/assert"
	"testing"
)

func Test_part2(t *testing.T) {
	program := lib.ReadProgram("input.txt")
	program.Run(5)
	assert.Equal(t, 15724522, program.Output)
}
