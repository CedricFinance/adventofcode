package day05

import (
	"github.com/CedricFinance/adventofcode/2019/lib"
	"github.com/stretchr/testify/assert"
	"testing"
)

func Test_part1(t *testing.T) {
	program := lib.ReadProgram("input.txt")
	go program.Run()
	program.Input <- 1

	output := GetDiagnosticCode(program)

	assert.Equal(t, int64(7286649), output)
}
