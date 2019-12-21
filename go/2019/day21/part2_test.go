package day21

import (
	"github.com/CedricFinance/adventofcode/2019/lib"
	"github.com/stretchr/testify/assert"
	"testing"
)

func TestPart2(t *testing.T) {
	memory := lib.ReadData("input.txt")

	damages := GetHullDamages(memory, []string{
		"NOT C T",
		"AND H T",
		"NOT B J",
		"AND A J",
		"OR T J",
		"AND D J",
		"NOT A T",
		"OR T J",
		"RUN",
	})

	assert.Equal(t, int64(1141251258), damages)
}
