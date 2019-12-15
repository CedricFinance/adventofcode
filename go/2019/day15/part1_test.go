package day15

import (
	"github.com/CedricFinance/adventofcode/2019/lib"
	"github.com/stretchr/testify/assert"
	"testing"
)

func TestPart1(t *testing.T) {
	program := lib.ReadProgramM("input.txt", 10000)

	robot := NewRobot(program)

	shipMap := make(map[Point]Tile)
	shipMap[robot.Position] = Empty

	moves := 0
	Explore(shipMap, robot, func(position Point, t Tile, m int) {
		if t == OxygenTank {
			moves = m
		}
	})

	assert.Equal(t, 294, moves)
}
