package day14

type PriorityQueue struct {
	data       []string
	priorities map[string]int
}

func (p *PriorityQueue) Len() int {
	return len(p.data)
}

func (p *PriorityQueue) Less(i, j int) bool {
	return p.priorities[p.data[i]] > p.priorities[p.data[j]]
}

func (p *PriorityQueue) Swap(i, j int) {
	p.data[i], p.data[j] = p.data[j], p.data[i]
}

func (p *PriorityQueue) Push(x interface{}) {
	p.data = append(p.data, x.(string))
}

func (p *PriorityQueue) Pop() interface{} {
	n := len(p.data)
	x := p.data[n-1]
	p.data = p.data[0 : n-1]
	return x
}
