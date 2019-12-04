package day04

import (
	"github.com/stretchr/testify/assert"
	"testing"
)

func Test_part1(t *testing.T) {
	result := CountValidPasswords(138307, 654504)
	assert.Equal(t, 1855, result)
}
