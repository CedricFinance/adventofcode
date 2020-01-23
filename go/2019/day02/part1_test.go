package day02

import (
	"github.com/CedricFinance/adventofcode/2019/lib"
	"github.com/stretchr/testify/assert"
	"testing"
)

func Test_part1(t *testing.T) {
	program := lib.ReadProgram("input.txt")
	program.Data.Write(1, 12)
	program.Data.Write(2, 2)

	program.Run()

	assert.Equal(t, int64(2842648), program.Data.Read(0))
}
