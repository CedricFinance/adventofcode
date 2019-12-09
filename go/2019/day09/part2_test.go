package day09

import (
	"github.com/CedricFinance/adventofcode/2019/lib"
	"github.com/stretchr/testify/assert"
	"testing"
)

func Test_part2(t *testing.T) {
	program := lib.ReadProgramM("input.txt", 10000)

	go program.Run()
	program.Input <- 2

	assert.Equal(t, int64(88231), <-program.Output)
}
