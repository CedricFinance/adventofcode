package day15

import (
	"github.com/CedricFinance/adventofcode/2019/lib"
	"github.com/stretchr/testify/assert"
	"testing"
)

func TestPart2(t *testing.T) {
	program := lib.ReadProgramM("input.txt", 10000)

	robot := NewRobot(program)

	shipMap := make(map[Point]Tile)
	shipMap[robot.Position] = Empty

	var tankPosition *Point
	Explore(shipMap, robot, func(position Point, tile Tile, moves int) {
		if tile == OxygenTank {
			tankPosition = &position
		}
	})

	fillTime := FillOxygen(*tankPosition, shipMap, nil)

	assert.Equal(t, 388, fillTime)
}
