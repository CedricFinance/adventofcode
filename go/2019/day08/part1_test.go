package day08

import (
	"github.com/stretchr/testify/assert"
	"testing"
)

func Test_part1(t *testing.T) {
	image := readImage("input.txt", 25, 6)

	_, minLayerColors := FindLayerWithFewestZeros(image)

	assert.Equal(t, 1862, minLayerColors['1']*minLayerColors['2'])
}
