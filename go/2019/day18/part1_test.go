package day18

import (
	"github.com/stretchr/testify/assert"
	"testing"
)

func TestPart1(t *testing.T) {
	m := read("input.txt")

	length := FindShortestPath(m)

	assert.Equal(t, 4228, length)
}
