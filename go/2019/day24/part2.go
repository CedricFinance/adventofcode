package day24

import (
	"fmt"
	"io"
	"io/ioutil"
	"strings"
)

func CountBugs(maps *Maps) int {
	result := 0
	for _, m := range maps.maps {
		result += BugsCount(m)
	}
	return result
}

func BugsCount(m Map2) int {
	result := 0
	for y := uint8(0); y < 5; y++ {
		for x := uint8(0); x < 5; x++ {
			if m.Get(x, y) {
				result++
			}
		}
	}
	return result
}

type Map2 interface {
	Get(x, y uint8) bool
	Set(x, y uint8, v bool)
	ToUInt32() uint32
	Next(outerUp, outerDown, outerLeft, outerRight, innerUp, innerDown, innerLeft, innerRight uint8) Map2
	OuterNeighboors() (uint8, uint8, uint8, uint8)
	InnerNeighboors() (uint8, uint8, uint8, uint8)
}

type Maps struct {
	maps     map[int]Map2
	minLevel int
	maxLevel int
}

func (m Maps) Next() *Maps {
	newMaps := Maps{
		maps:     make(map[int]Map2),
		minLevel: m.minLevel,
		maxLevel: m.maxLevel,
	}

	var outerUp, outerDown, outerLeft, outerRight uint8

	for i := m.minLevel; i <= m.maxLevel; i++ {
		var innerUp, innerDown, innerLeft, innerRight uint8
		if i < m.maxLevel {
			innerUp, innerDown, innerLeft, innerRight = m.maps[i+1].OuterNeighboors()
		}
		newMaps.maps[i] = m.maps[i].Next(outerUp, outerDown, outerLeft, outerRight, innerUp, innerDown, innerLeft, innerRight)

		outerUp, outerDown, outerLeft, outerRight = m.maps[i].InnerNeighboors()
	}

	minOuterUp, minOuterDown, minOuterLeft, minOuterRight := m.maps[m.minLevel].OuterNeighboors()
	if minOuterUp != 0 || minOuterDown != 0 || minOuterLeft != 0 || minOuterRight != 0 {
		newOuterMap := Map2(&IntMap2{0})
		newOuterMap = newOuterMap.Next(0, 0, 0, 0, minOuterUp, minOuterDown, minOuterLeft, minOuterRight)
		newMaps.minLevel--
		newMaps.maps[newMaps.minLevel] = newOuterMap
	}

	maxInnerUp, maxInnerDown, maxInnerLeft, maxInnerRight := m.maps[m.maxLevel].InnerNeighboors()
	if maxInnerUp != 0 || maxInnerDown != 0 || maxInnerLeft != 0 || maxInnerRight != 0 {
		newInnerMap := Map2(&IntMap2{0})
		newInnerMap = newInnerMap.Next(maxInnerUp, maxInnerDown, maxInnerLeft, maxInnerRight, 0, 0, 0, 0)
		newMaps.maxLevel++
		newMaps.maps[newMaps.maxLevel] = newInnerMap
	}

	return &newMaps
}

type IntMap2 struct {
	data uint32
}

func (m *IntMap2) OuterNeighboors() (uint8, uint8, uint8, uint8) {
	var outerUp, outerDown, outerLeft, outerRight uint8

	for i := uint8(0); i < 5; i++ {
		if m.Get(0, i) {
			outerLeft++
		}
		if m.Get(i, 0) {
			outerUp++
		}
		if m.Get(4, i) {
			outerRight++
		}
		if m.Get(i, 4) {
			outerDown++
		}
	}

	return outerUp, outerDown, outerLeft, outerRight
}

func (m *IntMap2) InnerNeighboors() (uint8, uint8, uint8, uint8) {
	var innerUp, innerDown, innerLeft, innerRight uint8

	if m.Get(1, 2) {
		innerLeft++
	}
	if m.Get(2, 1) {
		innerUp++
	}
	if m.Get(2, 3) {
		innerDown++
	}
	if m.Get(3, 2) {
		innerRight++
	}

	return innerUp, innerDown, innerLeft, innerRight
}

func (m *IntMap2) Next(outerUp, outerDown, outerLeft, outerRight, innerUp, innerDown, innerLeft, innerRight uint8) Map2 {
	newMap := IntMap2{0}
	var x, y uint8
	for y = 0; y < 5; y++ {
		for x = 0; x < 5; x++ {
			if x == 2 && y == 2 {
				continue
			}
			count := AliveNeighboors2(m, x, y)
			if x == 0 {
				count += outerLeft
			}
			if x == 4 {
				count += outerRight
			}
			if y == 0 {
				count += outerUp
			}
			if y == 4 {
				count += outerDown
			}
			if x == 1 && y == 2 {
				count += innerLeft
			}
			if x == 2 && y == 1 {
				count += innerUp
			}
			if x == 2 && y == 3 {
				count += innerDown
			}
			if x == 3 && y == 2 {
				count += innerRight
			}
			if m.Get(x, y) {
				newMap.Set(x, y, count == 1)
			} else {
				newMap.Set(x, y, count == 1 || count == 2)
			}
		}
	}
	return &newMap
}

func (m *IntMap2) ToUInt32() uint32 {
	return m.data
}

func (m *IntMap2) Get(x, y uint8) bool {
	if x < 0 || x > 4 || y < 0 || y > 4 {
		return false
	}
	return ((m.data >> uint32(5*y+x)) & uint32(1)) == 1
}

func (m *IntMap2) Set(x uint8, y uint8, value bool) {
	bit := uint32(1) << uint32(5*y+x)
	if value {
		m.data = m.data | bit
	} else {
		m.data = m.data & ^bit
	}
}

func AliveNeighboors2(m Map2, x, y uint8) uint8 {
	count := uint8(0)
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

func Display2(m Map2, out io.Writer) {
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

func DisplayMaps(m *Maps, out io.Writer) {
	for i := m.minLevel; i <= m.maxLevel; i++ {
		fmt.Fprintf(out, "Depth: %d\n", i)
		Display2(m.maps[i], out)
	}
	fmt.Fprintln(out)
}

func readRecursiveMap(file string) *Maps {
	data, err := ioutil.ReadFile(file)
	if err != nil {
		panic(err)
	}

	lines := strings.Split(string(data), "\n")

	var result IntMap2
	for i, line := range lines {
		for j, c := range line {
			result.Set(uint8(j), uint8(i), c == '#')
		}
	}

	maps := make(map[int]Map2)
	maps[0] = &result

	return &Maps{
		maps:     maps,
		minLevel: 0,
		maxLevel: 0,
	}
}
