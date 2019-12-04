package day04

import (
	"github.com/stretchr/testify/assert"
	"testing"
)

func Test_part2(t *testing.T) {
	result := CountReallyValidPasswords(138307, 654504)
	assert.Equal(t, 1253, result)
}
