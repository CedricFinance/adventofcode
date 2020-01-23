package day17

import (
	"github.com/CedricFinance/adventofcode/2019/lib"
	"github.com/stretchr/testify/assert"
	"testing"
)

func TestPart2(t *testing.T) {
	program := lib.ReadProgramM("input.txt", 10000)
	program.Data.Write(0, 2)

	dustCollected := Run(program, false)
	assert.Equal(t, int64(833429), dustCollected)
}
