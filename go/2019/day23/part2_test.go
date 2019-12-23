package day23

import (
	"github.com/CedricFinance/adventofcode/2019/lib"
	"github.com/stretchr/testify/assert"
	"testing"
)

func TestPart2(t *testing.T) {
	originalMemory := lib.ReadData("input.txt")

	packet := GetFirstDuplicatedNATPacket(originalMemory)

	assert.Equal(t, int64(11041), packet.Y)
}
