package day12

import (
	"github.com/stretchr/testify/assert"
	"testing"
)

func Test_part1(t *testing.T) {
	moons := day12Input()
	moons.SimulateN(1000)

	assert.Equal(t, 8287, moons.TotalEnergy())
}

func Test_ex1(t *testing.T) {
	moons := day12ex1Input()
	moons.SimulateN(10)

	assert.Equal(t, 179, moons.TotalEnergy())
}

func day12Input() Moons {
	moons := [4]*Moon{
		{Position: Vector{-19, -4, 2}},
		{Position: Vector{-9, 8, -16}},
		{Position: Vector{-4, 5, -11}},
		{Position: Vector{1, 9, -13}},
	}
	return moons
}

func day12ex1Input() Moons {
	moons := [4]*Moon{
		{Position: Vector{-1, 0, 2}},
		{Position: Vector{2, -10, -7}},
		{Position: Vector{4, -8, 8}},
		{Position: Vector{3, 5, -1}},
	}
	return moons
}
