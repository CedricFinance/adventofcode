package day24

import (
	"bytes"
	"github.com/stretchr/testify/assert"
	"strings"
	"testing"
)

func TestMapNext(t *testing.T) {
	m := IntMap(0)
	m.Set(0, 0, true)

	var buffer bytes.Buffer
	Display(&m, &buffer)
	assert.Equal(t, strings.Join([]string{
		"#....",
		".....",
		".....",
		".....",
		".....",
		"",
	}, "\n"), buffer.String())

	buffer.Reset()
	newMap := m.Next()
	Display(newMap, &buffer)
	assert.Equal(t, strings.Join([]string{
		".#...",
		"#....",
		".....",
		".....",
		".....",
		"",
	}, "\n"), buffer.String())

	buffer.Reset()
	newMap = newMap.Next()
	Display(newMap, &buffer)
	assert.Equal(t, strings.Join([]string{
		"#.#..",
		".#...",
		"#....",
		".....",
		".....",
		"",
	}, "\n"), buffer.String())
}

func TestMapEx1(t *testing.T) {
	m := read("ex1.txt")

	var buffer bytes.Buffer
	Display(m, &buffer)
	assert.Equal(t, strings.Join([]string{
		"....#",
		"#..#.",
		"#..##",
		"..#..",
		"#....",
		"",
	}, "\n"), buffer.String())

	buffer.Reset()
	newMap := m.Next()
	Display(newMap, &buffer)
	assert.Equal(t, strings.Join([]string{
		"#..#.",
		"####.",
		"###.#",
		"##.##",
		".##..",
		"",
	}, "\n"), buffer.String())

	buffer.Reset()
	newMap = newMap.Next()
	Display(newMap, &buffer)
	assert.Equal(t, strings.Join([]string{
		"#####",
		"....#",
		"....#",
		"...#.",
		"#.###",
		"",
	}, "\n"), buffer.String())

	buffer.Reset()
	newMap = newMap.Next()
	Display(newMap, &buffer)
	assert.Equal(t, strings.Join([]string{
		"#....",
		"####.",
		"...##",
		"#.##.",
		".##.#",
		"",
	}, "\n"), buffer.String())
}

func TestPart1(t *testing.T) {
	m := read("input.txt")

	firstDuplicatedState := FindFirstDuplicateState(m)

	assert.Equal(t, 23846449, BiodiversityRating(firstDuplicatedState))
}

func TestBiodiversityRating(t *testing.T) {
	m := IntMap(0)
	m.Set(0, 3, true)
	m.Set(1, 4, true)

	assert.Equal(t, 2129920, BiodiversityRating(&m))
}
