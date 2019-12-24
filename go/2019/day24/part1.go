package day24

import (
	"fmt"
	"io"
	"io/ioutil"
	"strings"
)

type Map interface {
	Get(x, y uint8) bool
	Set(x, y uint8, v bool)
	ToUInt32() uint32
	Next() Map
}

type ArrayMap struct {
	data [7][7]bool
}

type IntMap uint32

func (m *IntMap) Next() Map {
	newMap := IntMap(0)
	var x, y uint8
	for y = 0; y < 5; y++ {
		for x = 0; x < 5; x++ {
			count := AliveNeighboors(m, x, y)
			if m.Get(x, y) {
				newMap.Set(x, y, count == 1)
			} else {
				newMap.Set(x, y, count == 1 || count == 2)
			}
		}
	}
	return &newMap
}

func (m *IntMap) ToUInt32() uint32 {
	return uint32(*m)
}

func (m *IntMap) Get(x, y uint8) bool {
	if x < 0 || x > 4 || y < 0 || y > 4 {
		return false
	}
	v := uint32(*m)
	return ((v >> uint32(5*y+x)) & uint32(1)) == 1
}

func (m *IntMap) Set(x uint8, y uint8, value bool) {
	bit := uint32(1) << uint32(5*y+x)
	if value {
		*m = IntMap(uint32(*m) | bit)
	} else {
		*m = IntMap(uint32(*m) & ^bit)
	}
}

func AliveNeighboors(m Map, x, y uint8) int {
	count := 0
	if m.Get(x+1, y) {
		count++
	}
	if m.Get(x-1, y) {
		count++
	}
	if m.Get(x, y+1) {
		count++
	}
	if m.Get(x, y-1) {
		count++
	}
	return count
}

func Display(m Map, out io.Writer) {
	for y := uint8(0); y < 5; y++ {
		for x := uint8(0); x < 5; x++ {
			if m.Get(x, y) {
				fmt.Fprint(out, "#")
			} else {
				fmt.Fprint(out, ".")
			}
		}
		fmt.Fprintln(out)
	}
}

func read(file string) Map {
	data, err := ioutil.ReadFile(file)
	if err != nil {
		panic(err)
	}

	lines := strings.Split(string(data), "\n")

	var result IntMap
	for i, line := range lines {
		for j, c := range line {
			result.Set(uint8(j), uint8(i), c == '#')
		}
	}

	return &result
}

func FindFirstDuplicateState(m Map) Map {
	previousStates := make(map[uint32]bool)

	previousStates[m.ToUInt32()] = true
	for {
		m = m.Next()
		if previousStates[m.ToUInt32()] {
			return m
		}
		previousStates[m.ToUInt32()] = true
	}
}

func BiodiversityRating(m Map) int {
	v := 1
	rating := 0
	for y := uint8(0); y < 5; y++ {
		for x := uint8(0); x < 5; x++ {
			if m.Get(x, y) {
				rating += v
			}
			v *= 2
		}
	}
	return rating
}
