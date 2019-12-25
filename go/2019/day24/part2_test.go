package day24

import (
	"fmt"
	"github.com/stretchr/testify/assert"
	"os"
	"testing"
)

func TestMapPart2_Ex1(t *testing.T) {
	maps := readRecursiveMap("ex1.txt")

	fmt.Println("At Start")
	DisplayMaps(maps, os.Stdout)

	for i := 0; i < 10; i++ {
		fmt.Printf("After %d minutes\n", i+1)
		maps = maps.Next()
		DisplayMaps(maps, os.Stdout)
	}

	result := CountBugs(maps)

	assert.Equal(t, 99, result)
}

func TestPart2(t *testing.T) {
	maps := readRecursiveMap("input.txt")

	fmt.Println("At Start")
	DisplayMaps(maps, os.Stdout)

	for i := 0; i < 200; i++ {
		fmt.Printf("After %d minutes\n", i+1)
		maps = maps.Next()
	}

	result := CountBugs(maps)

	assert.Equal(t, 1934, result)
}

func TestMaps_Next(t *testing.T) {
	m := &IntMap2{0}
	m.Set(0, 0, true)

	maps := &Maps{maps: make(map[int]Map2)}
	maps.maps[0] = m

	fmt.Println("At Start")
	DisplayMaps(maps, os.Stdout)

	for i := 0; i < 10; i++ {
		fmt.Printf("After %d minutes\n", i+1)
		maps = maps.Next()
		DisplayMaps(maps, os.Stdout)
	}
}
