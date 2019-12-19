package day19

import (
	"github.com/CedricFinance/adventofcode/2019/lib"
	"github.com/stretchr/testify/assert"
	"testing"
)

func TestPart1(t *testing.T) {
	data := lib.ReadData("input.txt")

	count := CountAffectedPoints(data)

	assert.Equal(t, 206, count)
}
