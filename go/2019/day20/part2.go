package day20

import (
	"fmt"
	"github.com/CedricFinance/adventofcode/2019/day20/astar"
	"github.com/CedricFinance/adventofcode/2019/lib"
	"io/ioutil"
	"strings"
)

type DimensionalMapNode struct {
	m        *DimensionalMap
	Position DimensionPoint
}

func (n *DimensionalMapNode) String() string {
	return fmt.Sprintf("Node%s", n.Position)
}

func (n DimensionalMapNode) Equals(other astar.Node) bool {
	return n.Position == (other.(*DimensionalMapNode)).Position
}

func (n DimensionalMapNode) To() []astar.Arc {
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

	other := n.m.teleports[n.Position.Point]
	if other != nil {
		d := n.Position.Depth
		if n.Position.X == 0 || n.Position.Y == 0 || n.Position.Y == n.m.Height()-1 || n.Position.X == n.m.Width()-1 {
			d--
		} else {
			d++
		}

		if d >= 0 {
			otherNode, _ := n.m.nodeAt(DimensionPoint{Point: *other, Depth: d})
			results = append(results, astar.Arc{
				To:   otherNode,
				Cost: 1,
			})
		}
	}

	return results
}

func (n DimensionalMapNode) Heuristic(_ astar.Node) int {
	return 1
}

func (m *DimensionalMap) nodeAt(position DimensionPoint) (*DimensionalMapNode, bool) {
	if v := m.nodeCache[position]; v != nil {
		return v, true
	}
	if m.data[position.Y+2][position.X+2] != '.' {
		return nil, false
	}

	node := &DimensionalMapNode{
		m:        m,
		Position: position,
	}

	m.nodeCache[position] = node
	return node, true
}

type DimensionalMap struct {
	data        []string
	teleporters map[string]Teleporter
	teleports   map[lib.Point]*lib.Point
	nodeCache   map[DimensionPoint]*DimensionalMapNode
}

type DimensionPoint struct {
	lib.Point
	Depth int
}

func (r DimensionPoint) String() string {
	return fmt.Sprintf("DNode%s(d=%d)", r.Point, r.Depth)
}

func (r DimensionPoint) EastPosition() DimensionPoint {
	return DimensionPoint{
		Point: r.Point.EastPosition(),
		Depth: r.Depth,
	}
}

func (r DimensionPoint) WestPosition() DimensionPoint {
	return DimensionPoint{
		Point: r.Point.WestPosition(),
		Depth: r.Depth,
	}
}

func (r DimensionPoint) NorthPosition() DimensionPoint {
	return DimensionPoint{
		Point: r.Point.NorthPosition(),
		Depth: r.Depth,
	}
}

func (r DimensionPoint) SouthPosition() DimensionPoint {
	return DimensionPoint{
		Point: r.Point.SouthPosition(),
		Depth: r.Depth,
	}
}

func (m *DimensionalMap) Width() int {
	return len(m.data[0]) - 4
}

func (m *DimensionalMap) Height() int {
	return len(m.data) - 4
}

func (m *DimensionalMap) GetRow(y int) string {
	line := m.data[y+2]
	return line[2 : len(line)-2]
}

func (m *DimensionalMap) DonutWidth() int {
	i := 2
	for m.data[i][i] == '#' || m.data[i][i] == '.' {
		i++
	}
	return i - 2
}

func (m *DimensionalMap) Visit(f VisitFunction) {
	donutWidth := m.DonutWidth()
	for y := 0; y < donutWidth; y++ {
		row := m.GetRow(y)
		for x, cell := range row {
			label := m.getLabel(x, y)
			f(x, y, cell, label)
		}
	}
}

func (m *DimensionalMap) FindTeleporters(f FindTeleportersFunction) {
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

func (m *DimensionalMap) getLabel(x int, y int) string {
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

func (m *DimensionalMap) GetCell(x int, y int) uint8 {
	return m.data[y+2][x+2]
}

func FindShortestPathD(m *DimensionalMap, startLabel, endLabel string) int {
	var start lib.Point
	var end lib.Point
	teleporterPosition := make(map[string]lib.Point)

	m.FindTeleporters(func(x, y int, label string) {
		if label == startLabel {
			start = lib.Point{X: x, Y: y}
		}
		if label == endLabel {
			end = lib.Point{X: x, Y: y}
		}
		if p, ok := teleporterPosition[label]; ok {
			otherP := lib.Point{X: x, Y: y}
			m.teleporters[label] = Teleporter{
				Name:        label,
				FirstPoint:  p,
				SecondPoint: otherP,
			}
			m.teleports[p] = &otherP
			m.teleports[otherP] = &p
			return
		}

		teleporterPosition[label] = lib.Point{X: x, Y: y}
	})

	s, _ := m.nodeAt(DimensionPoint{
		Point: start,
		Depth: 0,
	})
	e, _ := m.nodeAt(DimensionPoint{
		Point: end,
		Depth: 0,
	})
	_, cost := astar.Route(s, e)
	return cost
}

func readDimensionalMap(file string) *DimensionalMap {
	data, err := ioutil.ReadFile(file)
	if err != nil {
		panic(err)
	}

	lines := strings.Split(string(data), "\n")
	return &DimensionalMap{
		data:        lines,
		teleporters: make(map[string]Teleporter),
		teleports:   make(map[lib.Point]*lib.Point),
		nodeCache:   make(map[DimensionPoint]*DimensionalMapNode),
	}
}
