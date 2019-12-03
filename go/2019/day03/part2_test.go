package day03

import (
	"github.com/stretchr/testify/assert"
	"testing"
)

func Test_min_steps_ex1(t *testing.T) {
	wires := readWires("ex1.txt")
	minSteps := FindMinStepsToIntersections(wires[0], wires[1])
	assert.Equal(t, 30, minSteps)
}

func Test_min_steps_ex2(t *testing.T) {
	wires := readWires("ex2.txt")
	minSteps := FindMinStepsToIntersections(wires[0], wires[1])
	assert.Equal(t, 610, minSteps)
}

func Test_part2(t *testing.T) {
	wires := readWires("input.txt")
	minSteps := FindMinStepsToIntersections(wires[0], wires[1])
	assert.Equal(t, 35038, minSteps)
}
