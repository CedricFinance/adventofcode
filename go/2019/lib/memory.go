package lib

type Memory interface {
	Read(address int64) int64
	Write(address int64, value int64)
	Slice(from int64, to int64) []int64
}

func NewSliceMemory(data []int64) *SliceMemory {
	return &SliceMemory{
		Data: data,
	}
}

type SliceMemory struct {
	Data []int64
}

func (s *SliceMemory) Read(address int64) int64 {
	return s.Data[address]
}

func (s *SliceMemory) Write(address int64, value int64) {
	s.Data[address] = value
}

func (s *SliceMemory) Slice(from int64, to int64) []int64 {
	return s.Data[from:to]
}

func NewMapMemory(data []int64) *MapMemory {
	m := make(map[int64]int64)

	for i, value := range data {
		m[int64(i)] = value
	}

	return &MapMemory{
		Data: m,
	}
}

type MapMemory struct {
	Data map[int64]int64
}

func (m *MapMemory) Read(address int64) int64 {
	return m.Data[address]
}

func (m *MapMemory) Write(address int64, value int64) {
	m.Data[address] = value
}

func (m *MapMemory) Slice(from int64, to int64) []int64 {
	var result []int64
	for i := from; i < to; i++ {
		result = append(result, m.Read(i))
	}
	return result
}
