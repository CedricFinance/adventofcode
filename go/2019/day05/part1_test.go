package day05

import (
	"github.com/CedricFinance/adventofcode/2019/lib"
	"github.com/stretchr/testify/assert"
	"testing"
)

func Test_part1(t *testing.T) {
	program := lib.ReadProgram()
	program.Run(1)
	assert.Equal(t, 7286649, program.Output)
}
