package day13

import (
	"github.com/CedricFinance/adventofcode/2019/lib"
	"github.com/stretchr/testify/assert"
	"testing"
)

func TestPart2(t *testing.T) {
	program := lib.ReadProgramM("input.txt", 10000)
	program.Data[0] = 2

	go program.Run()

	score := RunGame(program, true)

	assert.Equal(t, 11140, score)
}
