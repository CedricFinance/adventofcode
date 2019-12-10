package day10

import (
	"github.com/CedricFinance/adventofcode/2019/lib"
	"github.com/stretchr/testify/assert"
	"sort"
	"testing"
)

func Test_part2(t *testing.T) {
	asteroidsMap, asteroidsPositions := read("input.txt")

	position := lib.Point{X: 20, Y: 20}
	visible := VisibleAsteroids(asteroidsPositions, asteroidsMap, position)

	sort.Sort(ByAngle{data: visible, station: position})

	assert.Equal(t, lib.Point{3, 17}, visible[199])
}
