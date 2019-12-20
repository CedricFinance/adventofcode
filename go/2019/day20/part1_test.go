package day20

import (
	"github.com/stretchr/testify/assert"
	"testing"
)

func TestRead(t *testing.T) {
	m := read("input.txt")

	assert.Equal(t, 119, m.Width())
	assert.Equal(t, 129, m.Height())
	assert.Equal(t, 33, m.DonutWidth())
}

func TestPart1Ex1(t *testing.T) {
	m := read("ex1.txt")

	cost := FindShortestPath(m, "AA", "ZZ")

	assert.Equal(t, 23, cost)
}

func TestPart1(t *testing.T) {
	m := read("input.txt")

	cost := FindShortestPath(m, "AA", "ZZ")

	assert.Equal(t, 604, cost)
}
