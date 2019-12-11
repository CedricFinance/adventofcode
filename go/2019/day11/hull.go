package day11

import (
	"bytes"
	"fmt"
	"github.com/CedricFinance/adventofcode/2019/lib"
)

type Hull map[lib.Point]Color

func (h Hull) String(blackStr, whiteStr string) string {
	var buffer bytes.Buffer

	bounds := h.GetBounds()

	for y := bounds.MinX; y <= bounds.MaxY; y++ {
		for x := bounds.MinY; x <= bounds.MaxX; x++ {
			if h[lib.Point{x, y}] == Black {
				fmt.Fprint(&buffer, blackStr)
			} else {
				fmt.Fprint(&buffer, whiteStr)
			}
		}
		fmt.Fprintln(&buffer)
	}

	return buffer.String()
}

type Bounds struct {
	MinX, MaxX, MinY, MaxY int
}

func (h Hull) GetBounds() Bounds {
	minX := 0
	maxX := 0
	minY := 0
	maxY := 0

	for p, _ := range h {
		if p.X > maxX {
			maxX = p.X
		}
		if p.X < minX {
			minX = p.X
		}
		if p.Y > maxY {
			maxY = p.Y
		}
		if p.Y < minY {
			minY = p.Y
		}
	}

	return Bounds{
		MinX: minX,
		MaxX: maxX,
		MinY: minY,
		MaxY: maxY,
	}
}
