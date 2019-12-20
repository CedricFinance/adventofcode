package day20

import (
	"fmt"
	"github.com/CedricFinance/adventofcode/2019/day20/astar"
	"github.com/CedricFinance/adventofcode/2019/lib"
	"io/ioutil"
	"strings"
)

type MapNode struct {
	m        *Map
	Position lib.Point
}

func (n *MapNode) String() string {
	return fmt.Sprintf("Node%s", n.Position)
}

func (n MapNode) Equals(other astar.Node) bool {
	return n.Position == (other.(*MapNode)).Position
}

func (n MapNode) To() []astar.Arc {
	var results []astar.Arc
	if node, ok := n.m.nodeAt(n.Position.EastPosition()); ok {
		results = append(results, astar.Arc{
			To:   node,
			Cost: 1,
		})
	}
	if node, ok := n.m.nodeAt(n.Position.WestPosition()); ok {
		results = append(results, astar.Arc{
			To:   node,
			Cost: 1,
		})
	}
	if node, ok := n.m.nodeAt(n.Position.NorthPosition()); ok {
		results = append(results, astar.Arc{
			To:   node,
			Cost: 1,
		})
	}
	if node, ok := n.m.nodeAt(n.Position.SouthPosition()); ok {
		results = append(results, astar.Arc{
			To:   node,
			Cost: 1,
		})
	}

	other := n.m.teleports[n.Position]
	if other != nil {
		otherNode, _ := n.m.nodeAt(*other)
		results = append(results, astar.Arc{
			To:   otherNode,
			Cost: 1,
		})
	}

	return results
}

func (m MapNode) Heuristic(from astar.Node) int {
	return 1
}

func (m *Map) nodeAt(position lib.Point) (*MapNode, bool) {
	if v := m.nodeCache[position]; v != nil {
		return v, true
	}
	if m.data[position.Y+2][position.X+2] != '.' {
		return nil, false
	}

	//label := m.getLabel(position.X, position.Y)

	node := &MapNode{
		m:        m,
		Position: position,
	}
	/*
		var node *MapNode
		if m.teleports[position] == nil {
			node = &MapNode{
				m:        m,
				Position: position,
			}
		} else {
			node = &MapNode{
				m:        m,
				Position: m.teleporters[label].FirstPoint,
			}
		}
	*/
	m.nodeCache[position] = node
	return node, true
}

type Teleporter struct {
	Name        string
	FirstPoint  lib.Point
	SecondPoint lib.Point
}

type Map struct {
	data        []string
	teleporters map[string]Teleporter
	teleports   map[lib.Point]*lib.Point
	nodeCache   map[lib.Point]*MapNode
}

func (m *Map) Width() int {
	return len(m.data[0]) - 4
}

func (m *Map) Height() int {
	return len(m.data) - 4
}

func (m *Map) GetRow(y int) string {
	line := m.data[y+2]
	return line[2 : len(line)-2]
}

func (m *Map) DonutWidth() int {
	i := 2
	for m.data[i][i] == '#' || m.data[i][i] == '.' {
		i++
	}
	return i - 2
}

type VisitFunction func(x, y int, char int32, label string)
type FindTeleportersFunction func(x, y int, label string)

func (m *Map) Visit(f VisitFunction) {
	donutWidth := m.DonutWidth()
	for y := 0; y < donutWidth; y++ {
		row := m.GetRow(y)
		for x, cell := range row {
			label := m.getLabel(x, y)
			f(x, y, cell, label)
		}
	}
}

func (m *Map) FindTeleporters(f FindTeleportersFunction) {
	donutWidth := m.DonutWidth()
	x := 0
	y := 0

	// outter ring
	for ; x < m.Width()-2; x++ {
		if m.GetCell(x, y) != '.' {
			continue
		}
		f(x, y, m.getLabel(x, y))
	}
	x++
	for ; y < m.Height()-2; y++ {
		if m.GetCell(x, y) != '.' {
			continue
		}
		f(x, y, m.getLabel(x, y))
	}
	y++
	for ; x > 1; x-- {
		if m.GetCell(x, y) != '.' {
			continue
		}
		f(x, y, m.getLabel(x, y))
	}
	x--
	for ; y > 1; y-- {
		if m.GetCell(x, y) != '.' {
			continue
		}
		f(x, y, m.getLabel(x, y))
	}

	x = donutWidth
	y = donutWidth - 1
	// inner ring
	for ; x < m.Width()-donutWidth; x++ {
		if m.GetCell(x, y) != '.' {
			continue
		}
		f(x, y, m.getLabel(x, y))
	}
	y++
	for ; y < m.Height()-donutWidth; y++ {
		if m.GetCell(x, y) != '.' {
			continue
		}
		f(x, y, m.getLabel(x, y))
	}
	x--
	for ; x > donutWidth-1; x-- {
		if m.GetCell(x, y) != '.' {
			continue
		}
		f(x, y, m.getLabel(x, y))
	}
	y--
	for ; y > donutWidth-1; y-- {
		if m.GetCell(x, y) != '.' {
			continue
		}
		f(x, y, m.getLabel(x, y))
	}
}

func (m *Map) getLabel(x int, y int) string {
	if x == 0 {
		if m.data[y+2][x] != ' ' {
			return m.data[y+2][x : x+2]
		}
	}
	if y == 0 {
		if m.data[y][x+2] != ' ' {
			return fmt.Sprintf("%c%c", m.data[y][x+2], m.data[y+1][x+2])
		}
	}
	if x == m.Width()-1 {
		if m.data[y+2][x+2+1] != ' ' {
			return m.data[y+2][x+2+1 : x+2+3]
		}
	}
	if y == m.Height()-1 {
		if m.data[y+2+1][x+2] != ' ' {
			return fmt.Sprintf("%c%c", m.data[y+2+1][x+2], m.data[y+2+2][x+2])
		}
	}

	donutWidth := m.DonutWidth()
	if y == donutWidth-1 {
		if m.data[y+2+1][x+2] != ' ' {
			return fmt.Sprintf("%c%c", m.data[y+2+1][x+2], m.data[y+2+2][x+2])
		}
	}
	if x == m.Width()-donutWidth {
		if m.data[y+2][x] != ' ' {
			return m.data[y+2][x : x+2]
		}
	}
	if y == m.Height()-donutWidth {
		if m.data[y][x+2] != ' ' {
			return fmt.Sprintf("%c%c", m.data[y][x+2], m.data[y+1][x+2])
		}
	}
	if x == donutWidth-1 {
		if m.data[y+2][x+2+1] != ' ' {
			return fmt.Sprintf("%c%c", m.data[y+2][x+2+1], m.data[y+2][x+2+2])
		}
	}

	return ""
}

func (m *Map) GetCell(x int, y int) uint8 {
	return m.data[y+2][x+2]
}

func FindShortestPath(m *Map, startLabel, endLabel string) int {
	var start lib.Point
	var end lib.Point
	teleporterPosition := make(map[string]lib.Point)

	m.FindTeleporters(func(x, y int, label string) {
		if label == startLabel {
			start = lib.Point{x, y}
		}
		if label == endLabel {
			end = lib.Point{x, y}
		}
		if p, ok := teleporterPosition[label]; ok {
			otherP := lib.Point{x, y}
			m.teleporters[label] = Teleporter{
				Name:        label,
				FirstPoint:  p,
				SecondPoint: otherP,
			}
			m.teleports[p] = &otherP
			m.teleports[otherP] = &p
			return
		}

		teleporterPosition[label] = lib.Point{x, y}
	})

	s, _ := m.nodeAt(start)
	e, _ := m.nodeAt(end)
	_, cost := astar.Route(s, e)
	return cost
}

func read(file string) *Map {
	data, err := ioutil.ReadFile(file)
	if err != nil {
		panic(err)
	}

	lines := strings.Split(string(data), "\n")
	return &Map{
		data:        lines,
		teleporters: make(map[string]Teleporter),
		teleports:   make(map[lib.Point]*lib.Point),
		nodeCache:   make(map[lib.Point]*MapNode),
	}
}
