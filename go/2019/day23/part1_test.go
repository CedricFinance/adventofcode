package day23

import (
	"github.com/CedricFinance/adventofcode/2019/lib"
	"github.com/stretchr/testify/assert"
	"testing"
)

func TestPart1(t *testing.T) {
	originalMemory := lib.ReadData("input.txt")

	packet := GetFirstPacket(originalMemory, 255)

	assert.Equal(t, int64(19040), packet.Y)
}
