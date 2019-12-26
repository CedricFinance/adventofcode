package day18

import (
	"fmt"
	"github.com/CedricFinance/adventofcode/2019/day18/dijkstra"
	"github.com/CedricFinance/adventofcode/lib"
	"github.com/logrusorgru/aurora"
	"github.com/willf/bitset"

	//"github.com/willf/bitset"
	"io"
	"io/ioutil"
	"math"
	"os"
	"sort"
	"strings"
	"time"
	"unicode"
)

func FindShortestPath(m Map) int {
	lib.ClearScreen()
	m.Display(os.Stdout)

	g := &MapGraph{
		vaultMap:   &m,
		nodesCache: make(map[lib.Point]*Node),
	}

	realGraph := &RealGraph{
		keysCount:     len(m.Keys),
		nodes:         make(map[string]*Node),
		adjacentNodes: make(map[*Node]map[*Node]int),
	}

	startNode := g.nodeAt(m.Entrance)
	distances := BFS(g, startNode, func(node *Node) bool { return node.Name != "." })
	for _, nodeDistance := range distances {
		realGraph.Add(startNode.Name, nodeDistance.Node.Name, nodeDistance.Distance)
	}

	for _, k := range m.Keys {
		startNode := g.nodeAt(k.Position)
		distances := BFS(g, startNode, func(node *Node) bool { return node.Name != "." })
		for _, nodeDistance := range distances {
			realGraph.Add(startNode.Name, nodeDistance.Node.Name, nodeDistance.Distance)
		}
	}
	for _, k := range m.Doors {
		startNode := g.nodeAt(k.Position)
		distances := BFS(g, startNode, func(node *Node) bool { return node.Name != "." })
		for _, nodeDistance := range distances {
			realGraph.Add(startNode.Name, nodeDistance.Node.Name, nodeDistance.Distance)
		}
	}

	d, _ := dijkstra.Dijkstra(realGraph, 0)

	result := math.MaxInt64
	for i, nodeWithKey := range realGraph.vertices {
		if !nodeWithKey.keys.All() {
			continue
		}

		if d[dijkstra.Vertex(i)] < result {
			result = d[dijkstra.Vertex(i)]
		}
	}

	return result
}

type Object struct {
	Name     string
	Position lib.Point
}

type Map struct {
	data     []string
	Entrance lib.Point
	Doors    []Object
	Keys     []Object
}

func read(file string) Map {
	data, err := ioutil.ReadFile(file)
	if err != nil {
		panic(err)
	}

	lines := strings.Split(string(data), "\n")

	var keys []Object
	var doors []Object
	var entrancePosition lib.Point
	for i, row := range lines {
		for j, tile := range row {
			if tile == '@' {
				entrancePosition = lib.Point{
					X: j,
					Y: i,
				}
			} else if unicode.IsLetter(tile) {
				if unicode.IsLower(tile) {
					keys = append(keys, Object{Name: fmt.Sprintf("%c", tile), Position: lib.Point{j, i}})
				} else {
					doors = append(doors, Object{Name: fmt.Sprintf("%c", tile), Position: lib.Point{j, i}})
				}
			}
		}
	}

	sort.Sort(ByName(keys))
	sort.Sort(ByName(doors))

	return Map{
		data:     lines,
		Entrance: entrancePosition,
		Keys:     keys,
		Doors:    doors,
	}
}

type ByName []Object

func (b ByName) Len() int {
	return len(b)
}

func (b ByName) Less(i, j int) bool {
	return b[i].Name < b[j].Name
}

func (b ByName) Swap(i, j int) {
	b[i], b[j] = b[j], b[i]
}

func (m Map) Display(out io.Writer) {
	for _, row := range m.data {
		for _, cell := range row {
			switch cell {
			case '.':
				fmt.Fprint(out, aurora.BgBlack(" ").String())
			case '#':
				fmt.Fprint(out, aurora.BgWhite(" ").String())
			case '@':
				fmt.Fprint(out, aurora.BgBrightBlue(aurora.Black("@")).String())
			default:
				if unicode.IsLetter(cell) {
					if unicode.IsLower(cell) {
						fmt.Fprint(out, aurora.BgBlack(aurora.Yellow(fmt.Sprintf("%c", cell))))
					} else {
						fmt.Fprint(out, aurora.BgYellow(aurora.Black(fmt.Sprintf("%c", cell))))
					}
				} else {
					fmt.Fprintf(out, "%c", cell)
				}
			}
		}
		fmt.Fprintln(out)
	}
}

func (m Map) TileAt(point lib.Point) uint8 {
	if point.X < 0 || point.Y < 0 || point.X >= len(m.data[0]) || point.Y >= len(m.data) {
		return '#'
	}
	return m.data[point.Y][point.X]
}

func (m Map) VertexToPoint(v dijkstra.Vertex) lib.Point {
	return lib.Point{
		X: int(v) % len(m.data[0]),
		Y: int(v) / len(m.data[0]),
	}
}

func (m Map) PointToVertex(position lib.Point) dijkstra.Vertex {
	return dijkstra.Vertex(position.Y*len(m.data[0]) + position.X)

}

func (m Map) DoorAt(point lib.Point) bool {
	tile := m.TileAt(point)
	return unicode.IsLetter(rune(tile)) && unicode.IsUpper(rune(tile))
}

type Node struct {
	Position   lib.Point
	Name       string
	Discovered bool
	Distance   int
}

func (n Node) String() string {
	return fmt.Sprintf("Node(%q)", n.Name)
}

type Graph interface {
	AdjacentNodes(n *Node) []*Node
	Nodes() []*Node
	LinkWeight(from, to *Node) int
}

type MapGraph struct {
	vaultMap   *Map
	nodesCache map[lib.Point]*Node
}

func (g *MapGraph) LinkWeight(from, to *Node) int {
	return 1
}

func (g *MapGraph) Nodes() []*Node {
	var results []*Node
	for _, n := range g.nodesCache {
		if n != nil {
			results = append(results, n)
		}
	}
	return results
}

func (g *MapGraph) AdjacentNodes(n *Node) []*Node {
	var nodes []*Node
	if n := g.nodeAt(n.Position.NorthPosition()); n != nil {
		nodes = append(nodes, n)
	}
	if n := g.nodeAt(n.Position.SouthPosition()); n != nil {
		nodes = append(nodes, n)
	}
	if n := g.nodeAt(n.Position.WestPosition()); n != nil {
		nodes = append(nodes, n)
	}
	if n := g.nodeAt(n.Position.EastPosition()); n != nil {
		nodes = append(nodes, n)
	}
	return nodes
}

func (g *MapGraph) nodeAt(position lib.Point) *Node {
	if n := g.nodesCache[position]; n != nil {
		return n
	}

	var node *Node

	t := g.vaultMap.TileAt(position)

	if t != '#' {
		node = &Node{
			Position:   position,
			Name:       fmt.Sprintf("%c", t),
			Discovered: false,
		}
	}

	g.nodesCache[position] = node

	return node
}

type NodeWithKeys struct {
	node *Node
	keys *bitset.BitSet
}

type RealGraph struct {
	keysCount     int
	nodes         map[string]*Node
	adjacentNodes map[*Node]map[*Node]int

	vertices      []*NodeWithKeys
	vertexIndexes map[uint64]int
	vertexLinks   map[int]map[int]int
}

func (r *RealGraph) LinkWeight(from, to *Node) int {
	return r.adjacentNodes[from][to]
}

func (r *RealGraph) AdjacentNodes(n *Node) []*Node {
	var results []*Node

	adj := r.adjacentNodes[n]

	for adjNode := range adj {
		results = append(results, adjNode)
	}

	return results
}

func (r *RealGraph) Vertices() []dijkstra.Vertex {
	if r.vertices != nil {
		return toVertexSlice(r)
	}

	r.vertices = make([]*NodeWithKeys, 0, 100000)
	r.vertexIndexes = make(map[uint64]int)
	r.vertexLinks = make(map[int]map[int]int)

	r.addVertices(r.nodes["@"], bitset.New(uint(r.keysCount)))

	return toVertexSlice(r)
}

func (r *RealGraph) addVertices(node *Node, keys *bitset.BitSet) int {
	i := r.vertexIndex(node, keys)
	if i != -1 {
		return i
	}

	r.vertices = append(r.vertices, &NodeWithKeys{
		node: node,
		keys: keys,
	})
	i = len(r.vertices) - 1
	r.vertexIndexes[key(node, keys)] = i
	r.vertexLinks[i] = make(map[int]int)

	distances := BFS(r, node, func(node *Node) bool {
		c := rune(node.Name[0])

		if c == '@' {
			return false
		}

		if unicode.IsLower(c) {
			return !keys.Test(uint(c - 'a'))
		}

		return !keys.Test(uint(c - 'A'))
	})

	for _, nodeDistance := range distances {
		if unicode.IsUpper(rune(nodeDistance.Node.Name[0])) {
			continue
		}
		newKeys := keys.Clone().Set(uint(nodeDistance.Node.Name[0] - 'a'))
		//fmt.Printf("Node %q is at %d from %s\n", nodeDistance.Node.Name, nodeDistance.Distance, node.Name)
		j := r.addVertices(nodeDistance.Node, newKeys)

		r.vertexLinks[i][j] = nodeDistance.Distance
	}

	return i
}

func toVertexSlice(r *RealGraph) []dijkstra.Vertex {
	v := make([]dijkstra.Vertex, len(r.vertices))
	for i := range r.vertices {
		v[i] = dijkstra.Vertex(i)
	}
	return v
}

func (r *RealGraph) Neighbors(v dijkstra.Vertex) []dijkstra.Vertex {
	links := r.vertexLinks[int(v)]
	results := make([]dijkstra.Vertex, len(links))
	i := 0
	for neighbor := range links {
		results[i] = dijkstra.Vertex(neighbor)
		i++
	}
	return results
}

func (r *RealGraph) Weight(u, v dijkstra.Vertex) int {
	return r.vertexLinks[int(u)][int(v)]
}

type Link struct {
	To     *Node
	Weight int
}

func (r *RealGraph) Links(n *Node) []*Link {
	nodes := r.adjacentNodes[n]
	results := make([]*Link, len(nodes))
	i := 0
	for n, d := range nodes {
		results[i] = &Link{
			To:     n,
			Weight: d,
		}
		i++
	}
	return results
}

func (r *RealGraph) Nodes() []*Node {
	results := make([]*Node, len(r.nodes))
	i := 0
	for _, n := range r.nodes {
		results[i] = n
		i++
	}
	return results
}

func (r *RealGraph) Add(from, to string, distance int) {
	fromNode := r.getOrCreate(from)
	toNode := r.getOrCreate(to)

	d, ok := r.adjacentNodes[fromNode][toNode]
	if ok && distance != d {
		panic(fmt.Errorf("invalid distance from %s to %s: %d and %d", from, to, distance, d))
	} else {
		r.adjacentNodes[fromNode][toNode] = distance
	}
}

func (r *RealGraph) getOrCreate(name string) *Node {
	n, ok := r.nodes[name]
	if ok {
		return n
	}

	n = &Node{Name: name}

	r.nodes[name] = n
	r.adjacentNodes[n] = make(map[*Node]int)

	return n
}

func (r *RealGraph) dot() {
	discoveredNodes := make(map[*Node]bool)
	fmt.Println("graph {")
	fmt.Println("  layout=twopi;")
	for node, adj := range r.adjacentNodes {
		discoveredNodes[node] = true
		for adjNode, distance := range adj {
			if !discoveredNodes[adjNode] {
				fmt.Printf("  %q -- %q [ label=\"%d\" ]\n", node.Name, adjNode.Name, distance)
			}
		}
	}
	fmt.Println("}")
}

func (r *RealGraph) vertexIndex(node *Node, keys *bitset.BitSet) int {
	i, ok := r.vertexIndexes[key(node, keys)]

	if ok {
		return i
	}

	return -1
}

func key(node *Node, keys *bitset.BitSet) uint64 {
	var keyIndex int
	if node.Name[0] == '@' {
		keyIndex = 99
	} else {
		keyIndex = int(node.Name[0] - 'a')
	}

	return keys.Bytes()[0]*100 + uint64(keyIndex)
}

type Queue struct {
	data []*Node
}

func (q *Queue) Enqueue(v *Node) {
	q.data = append(q.data, v)
}

func (q *Queue) Dequeue() *Node {
	v := q.data[0]
	q.data = q.data[1:]
	return v
}

func (q *Queue) Size() int {
	return len(q.data)
}

type NodeDistance struct {
	Node     *Node
	Distance int
}

func (n NodeDistance) String() string {
	return fmt.Sprintf("{ Name: %q, Distance: %d }", n.Node, n.Distance)
}

func BFS(g Graph, n *Node, predicate func(node *Node) bool) []NodeDistance {
	for _, n := range g.Nodes() {
		n.Discovered = false
	}

	q := &Queue{}
	n.Discovered = true
	n.Distance = 0
	q.Enqueue(n)

	var results []NodeDistance

	for q.Size() > 0 {
		v := q.Dequeue()

		for _, node := range g.AdjacentNodes(v) {
			if !node.Discovered {
				node.Discovered = true
				node.Distance = v.Distance + g.LinkWeight(v, node)
				if predicate(node) {
					results = append(results, NodeDistance{Node: node, Distance: node.Distance})
				} else {
					q.Enqueue(node)
				}
			}
		}
	}

	return results
}

func Explore(m Map, point lib.Point, visited map[lib.Point]bool) {
	currentTile := m.TileAt(point)
	if currentTile == '#' {
		return
	}

	if unicode.IsLetter(rune(currentTile)) {
		if unicode.IsUpper(rune(currentTile)) {
			return
		}
	}

	if visited[point] {
		return
	}

	visited[point] = true
	lib.PrintAt(point.X, point.Y, aurora.BgGreen(" ").String())
	time.Sleep(1 * time.Millisecond)

	Explore(m, point.EastPosition(), visited)
	Explore(m, point.WestPosition(), visited)
	Explore(m, point.NorthPosition(), visited)
	Explore(m, point.SouthPosition(), visited)
}
