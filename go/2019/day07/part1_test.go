package day07

import (
	"github.com/CedricFinance/adventofcode/2019/lib"
	"github.com/stretchr/testify/assert"
	"testing"
)

func Test_Part1_Ex1(t *testing.T) {
	originalMemory := lib.ReadProgram("ex1.txt")

	assert.Equal(t, 43210, FindMaxOutput(originalMemory))
}

func Test_Part1_Ex2(t *testing.T) {
	originalMemory := lib.ReadProgram("ex2.txt")

	assert.Equal(t, 54321, FindMaxOutput(originalMemory))
}

func Test_Part1_Ex3(t *testing.T) {
	originalMemory := lib.ReadProgram("ex3.txt")

	assert.Equal(t, 65210, FindMaxOutput(originalMemory))
}

func Test_Part1(t *testing.T) {
	originalMemory := lib.ReadProgram("input.txt")

	assert.Equal(t, 914828, FindMaxOutput(originalMemory))
}
