package day17

import (
	"github.com/CedricFinance/adventofcode/2019/lib"
	"github.com/stretchr/testify/assert"
	"testing"
)

func TestPart1(t *testing.T) {
	program := lib.ReadProgramM("input.txt", 10000)
	program.Data[0] = 1

	value := ComputeCalibrationValue(program)
	assert.Equal(t, 2804, value)
}
