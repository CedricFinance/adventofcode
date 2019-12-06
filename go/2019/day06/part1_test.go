package day06

import (
	"github.com/stretchr/testify/assert"
	"testing"
)

func Test_Count_Ex1(t *testing.T) {
	orbits := readOrbits("ex1.txt")

	assert.Equal(t, 54, orbits.Count())
}

func Test_Part1(t *testing.T) {
	orbits := readOrbits("input.txt")

	assert.Equal(t, 150150, orbits.Count())
}
