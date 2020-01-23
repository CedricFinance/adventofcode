package day18

import (
	"fmt"
	"github.com/CedricFinance/adventofcode/2019/day18/dijkstra"
	"github.com/CedricFinance/adventofcode/2019/lib"
	"github.com/willf/bitset"
	"math"
	"os"
	"strings"
	"unicode"
)

func FindShortestPathWith4Robots(file string) int {
	m := read(file)

	lib.ClearScreen()
	m.Display(os.Stdout)

	g := &MapGraph{
		vaultMap:   &m,
		nodesCache: make(map[lib.Point]*Node),
	}

	result1 := findMinSteps(m, g, lib.Point{m.Entrance.X - 2, m.Entrance.Y - 2})
	fmt.Printf("%d steps to collect all keys\n", result1)
	result2 := findMinSteps(m, g, lib.Point{m.Entrance.X, m.Entrance.Y - 2})
	fmt.Printf("%d steps to collect all keys\n", result2)
	result3 := findMinSteps(m, g, lib.Point{m.Entrance.X - 2, m.Entrance.Y})
	fmt.Printf("%d steps to collect all keys\n", result3)
	result4 := findMinSteps(m, g, lib.Point{m.Entrance.X, m.Entrance.Y})
	fmt.Printf("%d steps to collect all keys\n", result4)

	return result1 + result2 + result3 + result4
}

func findMinSteps(m Map, g *MapGraph, start lib.Point) int {
	realGraph := &RealGraph2{
		keysCount:     len(m.Keys),
		nodes:         make(map[string]*Node),
		adjacentNodes: make(map[*Node]map[*Node]int),
	}

	startNode := g.nodeAt(start)
	distances := BFS2(
		g,
		startNode,
		func(node *Node) bool { return node.Name != "." },
		func(node *Node) bool { return true },
	)

	var keys = make(map[string]*Object)
	var doors = make(map[string]*Object)

	for _, nodeDistance := range distances {
		if unicode.IsLower(rune(nodeDistance.Node.Name[0])) {
			keys[nodeDistance.Node.Name] = &Object{nodeDistance.Node.Name, nodeDistance.Node.Position}
		}
	}
	for _, nodeDistance := range distances {
		if unicode.IsUpper(rune(nodeDistance.Node.Name[0])) {
			if keys[strings.ToLower(nodeDistance.Node.Name)] != nil {
				doors[nodeDistance.Node.Name] = &Object{nodeDistance.Node.Name, nodeDistance.Node.Position}
			}
		}
	}

	distances = BFS2(
		g,
		startNode,
		func(node *Node) bool { return keys[node.Name] != nil || doors[node.Name] != nil },
		nil,
	)
	for _, nodeDistance := range distances {
		realGraph.Add(startNode.Name, nodeDistance.Node.Name, nodeDistance.Distance)
	}
	realGraph.keys = keys

	for _, k := range keys {
		startNode := g.nodeAt(k.Position)
		distances := BFS2(g, startNode, func(node *Node) bool { return keys[node.Name] != nil || doors[node.Name] != nil }, nil)
		for _, nodeDistance := range distances {
			realGraph.Add(startNode.Name, nodeDistance.Node.Name, nodeDistance.Distance)
		}
	}
	for _, k := range doors {
		startNode := g.nodeAt(k.Position)
		distances := BFS2(g, startNode, func(node *Node) bool { return keys[node.Name] != nil || doors[node.Name] != nil }, nil)
		for _, nodeDistance := range distances {
			realGraph.Add(startNode.Name, nodeDistance.Node.Name, nodeDistance.Distance)
		}
	}

	d, _ := dijkstra.Dijkstra(realGraph, 0)

	result := math.MaxInt64
	for i, nodeWithKey := range realGraph.vertices {
		if nodeWithKey.keys.Count() != uint(len(keys)) {
			continue
		}

		if d[dijkstra.Vertex(i)] < result {
			result = d[dijkstra.Vertex(i)]
		}
	}
	return result
}

func BFS2(g Graph, n *Node, appendPredicate func(node *Node) bool, enqueuePredicate func(node *Node) bool) []NodeDistance {
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
				appendNode := appendPredicate(node)
				if appendNode {
					results = append(results, NodeDistance{Node: node, Distance: node.Distance})
				}
				if (enqueuePredicate == nil && !appendNode) || (enqueuePredicate != nil && enqueuePredicate(node)) {
					q.Enqueue(node)
				}
			}
		}
	}

	return results
}

type RealGraph2 struct {
	keysCount     int
	nodes         map[string]*Node
	adjacentNodes map[*Node]map[*Node]int

	vertices      []*NodeWithKeys
	vertexIndexes map[uint64]int
	vertexLinks   map[int]map[int]int

	keys map[string]*Object
}

func (r *RealGraph2) LinkWeight(from, to *Node) int {
	return r.adjacentNodes[from][to]
}

func (r *RealGraph2) AdjacentNodes(n *Node) []*Node {
	var results []*Node

	adj := r.adjacentNodes[n]

	for adjNode := range adj {
		results = append(results, adjNode)
	}

	return results
}

func (r *RealGraph2) Vertices() []dijkstra.Vertex {
	if r.vertices != nil {
		return r.toVertexSlice()
	}

	r.vertices = make([]*NodeWithKeys, 0, 100000)
	r.vertexIndexes = make(map[uint64]int)
	r.vertexLinks = make(map[int]map[int]int)

	r.addVertices(r.nodes["@"], bitset.New(uint(r.keysCount)))

	return r.toVertexSlice()
}

func (r *RealGraph2) addVertices(node *Node, keys *bitset.BitSet) int {
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

	distances := BFS2(r, node, func(node *Node) bool {
		c := rune(node.Name[0])

		if c == '@' {
			return false
		}

		if unicode.IsLower(c) {
			return !keys.Test(uint(c - 'a'))
		}

		if r.keys[strings.ToLower(node.Name)] == nil {
			return false
		}

		return !keys.Test(uint(c - 'A'))
	}, nil)

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

func (r *RealGraph2) toVertexSlice() []dijkstra.Vertex {
	v := make([]dijkstra.Vertex, len(r.vertices))
	for i := range r.vertices {
		v[i] = dijkstra.Vertex(i)
	}
	return v
}

func (r *RealGraph2) Neighbors(v dijkstra.Vertex) []dijkstra.Vertex {
	links := r.vertexLinks[int(v)]
	results := make([]dijkstra.Vertex, len(links))
	i := 0
	for neighbor := range links {
		results[i] = dijkstra.Vertex(neighbor)
		i++
	}
	return results
}

func (r *RealGraph2) Weight(u, v dijkstra.Vertex) int {
	return r.vertexLinks[int(u)][int(v)]
}

func (r *RealGraph2) Links(n *Node) []*Link {
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

func (r *RealGraph2) Nodes() []*Node {
	results := make([]*Node, len(r.nodes))
	i := 0
	for _, n := range r.nodes {
		results[i] = n
		i++
	}
	return results
}

func (r *RealGraph2) Add(from, to string, distance int) {
	fromNode := r.getOrCreate(from)
	toNode := r.getOrCreate(to)

	d, ok := r.adjacentNodes[fromNode][toNode]
	if ok && distance != d {
		panic(fmt.Errorf("invalid distance from %s to %s: %d and %d", from, to, distance, d))
	} else {
		r.adjacentNodes[fromNode][toNode] = distance
	}
}

func (r *RealGraph2) getOrCreate(name string) *Node {
	n, ok := r.nodes[name]
	if ok {
		return n
	}

	n = &Node{Name: name}

	r.nodes[name] = n
	r.adjacentNodes[n] = make(map[*Node]int)

	return n
}

func (r *RealGraph2) dot() {
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

func (r *RealGraph2) vertexIndex(node *Node, keys *bitset.BitSet) int {
	i, ok := r.vertexIndexes[key(node, keys)]

	if ok {
		return i
	}

	return -1
}
