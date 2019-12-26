package dijkstra

import "container/heap"

// A PriorityQueue implements heap.Interface and holds Items.
type PriorityQueue struct {
	items []Vertex
	// value to index
	m map[Vertex]int
	// value to priority
	pr map[Vertex]int
}

func (pq *PriorityQueue) Len() int           { return len(pq.items) }
func (pq *PriorityQueue) Less(i, j int) bool { return pq.pr[pq.items[i]] < pq.pr[pq.items[j]] }
func (pq *PriorityQueue) Swap(i, j int) {
	pq.items[i], pq.items[j] = pq.items[j], pq.items[i]
	pq.m[pq.items[i]] = i
	pq.m[pq.items[j]] = j
}
func (pq *PriorityQueue) Push(x interface{}) {
	n := len(pq.items)
	item := x.(Vertex)
	pq.m[item] = n
	pq.items = append(pq.items, item)
}
func (pq *PriorityQueue) Pop() interface{} {
	old := pq.items
	n := len(old)
	item := old[n-1]
	pq.m[item] = -1
	pq.items = old[0 : n-1]
	return item
}

// update modifies the priority of an item in the queue.
func (pq *PriorityQueue) update(item Vertex, priority int) {
	pq.pr[item] = priority
	heap.Fix(pq, pq.m[item])
}
func (pq *PriorityQueue) addWithPriority(item Vertex, priority int) {
	heap.Push(pq, item)
	pq.update(item, priority)
}

const (
	Infinity      = int(^uint(0) >> 1)
	Uninitialized = -1
)

func Dijkstra(g Graph, source Vertex) (dist map[Vertex]int, prev map[Vertex]Vertex) {
	dist = make(map[Vertex]int)
	prev = make(map[Vertex]Vertex)
	sid := source
	dist[sid] = 0
	q := &PriorityQueue{[]Vertex{}, make(map[Vertex]int), make(map[Vertex]int)}
	for _, v := range g.Vertices() {
		if v != sid {
			dist[v] = Infinity
		}
		prev[v] = Uninitialized
		q.addWithPriority(v, dist[v])
	}
	for len(q.items) != 0 {
		u := heap.Pop(q).(Vertex)
		for _, v := range g.Neighbors(u) {
			alt := dist[u] + g.Weight(u, v)
			if alt < dist[v] {
				dist[v] = alt
				prev[v] = u
				q.update(v, alt)
			}
		}
	}
	return dist, prev
}

// A Graph is the interface implemented by graphs that
// this algorithm can run on.
type Graph interface {
	Vertices() []Vertex
	Neighbors(v Vertex) []Vertex
	Weight(u, v Vertex) int
}

// Nonnegative integer ID of vertex
type Vertex int
