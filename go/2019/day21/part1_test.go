package day21

import (
	"github.com/CedricFinance/adventofcode/2019/lib"
	"github.com/stretchr/testify/assert"
	"testing"
)

func TestPart1(t *testing.T) {
	memory := lib.ReadData("input.txt")

	damages := GetHullDamages(memory, []string{
		"OR D J",
		"NOT C T",
		"AND T J",
		"NOT A T",
		"OR T J",
		"WALK",
	})

	assert.Equal(t, int64(19352638), damages)
}
