package day06

import (
	"github.com/stretchr/testify/assert"
	"testing"
)

func Test_Distance_Ex1(t *testing.T) {
	orbits := readOrbits("ex1.txt")

	me := orbits.Objects["YOU"]
	santa := orbits.Objects["SAN"]

	assert.Equal(t, 4, orbits.Distance(me, santa))
}

func Test_Part2(t *testing.T) {
	orbits := readOrbits("input.txt")

	me := orbits.Objects["YOU"]
	santa := orbits.Objects["SAN"]

	assert.Equal(t, 352, orbits.Distance(me, santa))
}
