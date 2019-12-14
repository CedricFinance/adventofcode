package day14

import (
	"github.com/stretchr/testify/assert"
	"testing"
)

func TestProducePart2(t *testing.T) {
	reactions := Read("input.txt")

	factory := NewFactory(reactions)

	min := FindMaxFuel(factory, 1000000000000)

	assert.Equal(t, 13108426, min)
}
