package day20

import (
	"github.com/stretchr/testify/assert"
	"testing"
)

func TestPart2(t *testing.T) {
	m := readDimensionalMap("input.txt")

	cost := FindShortestPathD(m, "AA", "ZZ")

	assert.Equal(t, 7166, cost)
}
