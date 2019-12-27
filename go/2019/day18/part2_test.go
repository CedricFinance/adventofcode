package day18

import (
	"github.com/stretchr/testify/assert"
	"testing"
)

func TestPart2(t *testing.T) {
	length := FindShortestPathWith4Robots("input-part2.txt")
	assert.Equal(t, 1858, length)
}
