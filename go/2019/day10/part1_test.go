package day10

import (
	"github.com/CedricFinance/adventofcode/2019/lib"
	"github.com/stretchr/testify/assert"
	"testing"
)

func Test_ex1(t *testing.T) {
	asteroidsMap, asteroidsPositions := read("ex1.txt")

	visibleAsteroids, bestPosition := FindBestPosition(asteroidsPositions, asteroidsMap)

	assert.Equal(t, 8, visibleAsteroids)
	assert.Equal(t, lib.Point{3, 4}, bestPosition)
}

func Test_part1(t *testing.T) {
	asteroidsMap, asteroidsPositions := read("input.txt")

	visibleAsteroids, bestPosition := FindBestPosition(asteroidsPositions, asteroidsMap)

	assert.Equal(t, 292, visibleAsteroids)
	assert.Equal(t, lib.Point{20, 20}, bestPosition)
}
