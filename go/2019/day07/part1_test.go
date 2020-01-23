package day07

import (
	"github.com/CedricFinance/adventofcode/2019/lib"
	"github.com/stretchr/testify/assert"
	"testing"
)

func Test_Part1_Ex1(t *testing.T) {
	data := lib.ReadData("ex1.txt")

	assert.Equal(t, int64(43210), FindMaxOutput(data))
}

func Test_Part1_Ex2(t *testing.T) {
	data := lib.ReadData("ex2.txt")

	assert.Equal(t, int64(54321), FindMaxOutput(data))
}

func Test_Part1_Ex3(t *testing.T) {
	data := lib.ReadData("ex3.txt")

	assert.Equal(t, int64(65210), FindMaxOutput(data))
}

func Test_Part1(t *testing.T) {
	data := lib.ReadData("input.txt")

	assert.Equal(t, int64(914828), FindMaxOutput(data))
}
