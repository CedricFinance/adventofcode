package day19

import (
	"github.com/CedricFinance/adventofcode/2019/lib"
	"github.com/stretchr/testify/assert"
	"testing"
)

func TestPart2(t *testing.T) {
	memory := lib.ReadData("input.txt")

	detector := &Detector{
		Memory: memory,
	}

	minX, minY := FindSquare(detector, 100, 100000, 100)

	assert.Equal(t, 6190948, minX*10000+minY)
}
