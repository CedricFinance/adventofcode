package day11

import (
	"github.com/CedricFinance/adventofcode/2019/lib"
	"github.com/stretchr/testify/assert"
	"testing"
)

func Test_part1(t *testing.T) {
	program := lib.ReadProgramM("input.txt", 10000)

	panels := PaintPanels(program, Black)

	assert.Equal(t, 1964, len(panels))
}
