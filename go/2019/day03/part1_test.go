package day03

import (
	"github.com/stretchr/testify/assert"
	"math"
	"testing"
)

func Test_intersections_ex1(t *testing.T) {
	wires := readWires("ex1.txt")
	_, minDistance := FindClosestIntersection(wires[0], wires[1])
	assert.Equal(t, 6, minDistance)
}

func Test_intersections_ex2(t *testing.T) {
	wires := readWires("ex2.txt")
	_, minDistance := FindClosestIntersection(wires[0], wires[1])
	assert.Equal(t, 159, minDistance)
}

func Test_part1(t *testing.T) {
	wires := readWires("input.txt")

	segments1 := wires[0].toSegments()
	segments2 := wires[1].toSegments()

	intersections := FindIntersections(segments1, segments2)

	minDistance := math.MaxInt64
	for _, intersection := range intersections {
		d := intersection.ManhattanDistanceToOrigin()
		if d < minDistance {
			minDistance = d
		}
	}

	assert.Equal(t, 865, minDistance)
}
